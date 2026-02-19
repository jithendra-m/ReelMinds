import { query } from '../database/connection.js';
import { COMPLAINT_STATUS, PRIORITY, PAGINATION } from '../config/constants.js';
import path from 'path';

// Create new complaint
export const createComplaint = async (complaintData, userId) => {
  const { title, description, category_id, priority, image_proof_url } = complaintData;

  const result = await query(
    `INSERT INTO complaints (title, description, category_id, student_id, priority, image_proof_url, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      title,
      description,
      category_id || null,
      userId,
      priority || PRIORITY.MEDIUM,
      image_proof_url || null,
      COMPLAINT_STATUS.OPEN,
    ]
  );

  return result.rows[0];
};

// Get complaint by ID
export const getComplaintById = async (complaintId, userId = null, userRole = null) => {
  const result = await query(
    `SELECT 
      c.*,
      cat.name as category_name,
      s.first_name as student_first_name,
      s.last_name as student_last_name,
      s.email as student_email,
      s.student_id,
      st.first_name as staff_first_name,
      st.last_name as staff_last_name,
      st.email as staff_email
     FROM complaints c
     LEFT JOIN categories cat ON c.category_id = cat.id
     LEFT JOIN users s ON c.student_id = s.id
     LEFT JOIN users st ON c.assigned_to = st.id
     WHERE c.id = $1`,
    [complaintId]
  );

  if (result.rows.length === 0) {
    throw new Error('Complaint not found');
  }

  const complaint = result.rows[0];

  // Check access permissions
  if (userRole === 'STUDENT' && complaint.student_id !== userId) {
    throw new Error('Access denied');
  }

  return complaint;
};

// Get complaints with filters and pagination
export const getComplaints = async (filters, pagination, userId = null, userRole = null) => {
  const {
    status,
    category_id,
    priority,
    search,
    assigned_to,
    student_id,
  } = filters;

  const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT } = pagination;
  const offset = (page - 1) * limit;

  // Build WHERE clause
  const conditions = [];
  const values = [];
  let paramCount = 1;

  // Role-based filtering
  if (userRole === 'STUDENT') {
    conditions.push(`c.student_id = $${paramCount++}`);
    values.push(userId);
  }

  if (status) {
    conditions.push(`c.status = $${paramCount++}`);
    values.push(status);
  }

  if (category_id) {
    conditions.push(`c.category_id = $${paramCount++}`);
    values.push(category_id);
  }

  if (priority) {
    conditions.push(`c.priority = $${paramCount++}`);
    values.push(priority);
  }

  if (assigned_to) {
    conditions.push(`c.assigned_to = $${paramCount++}`);
    values.push(assigned_to);
  }

  if (student_id && userRole === 'ADMIN') {
    conditions.push(`c.student_id = $${paramCount++}`);
    values.push(student_id);
  }

  if (search) {
    conditions.push(`(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount})`);
    values.push(`%${search}%`);
    paramCount++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countResult = await query(
    `SELECT COUNT(*) as total FROM complaints c ${whereClause}`,
    values
  );
  const total = parseInt(countResult.rows[0].total);

  // Get complaints
  values.push(limit, offset);
  const result = await query(
    `SELECT 
      c.*,
      cat.name as category_name,
      s.first_name as student_first_name,
      s.last_name as student_last_name,
      s.student_id,
      st.first_name as staff_first_name,
      st.last_name as staff_last_name
     FROM complaints c
     LEFT JOIN categories cat ON c.category_id = cat.id
     LEFT JOIN users s ON c.student_id = s.id
     LEFT JOIN users st ON c.assigned_to = st.id
     ${whereClause}
     ORDER BY c.created_at DESC
     LIMIT $${paramCount++} OFFSET $${paramCount++}`,
    values
  );

  return {
    complaints: result.rows,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Update complaint
export const updateComplaint = async (complaintId, updateData, userId, userRole) => {
  const { status, priority, assigned_to, staff_notes, admin_notes, resolution_details } = updateData;

  // Get current complaint
  const currentComplaint = await getComplaintById(complaintId, userId, userRole);

  // Build update query
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (status && (userRole === 'ADMIN' || userRole === 'STAFF')) {
    updates.push(`status = $${paramCount++}`);
    values.push(status);
    
    if (status === COMPLAINT_STATUS.RESOLVED) {
      updates.push(`resolved_at = CURRENT_TIMESTAMP`);
    }
  }

  if (priority && userRole === 'ADMIN') {
    updates.push(`priority = $${paramCount++}`);
    values.push(priority);
  }

  if (assigned_to && userRole === 'ADMIN') {
    updates.push(`assigned_to = $${paramCount++}`);
    values.push(assigned_to);
  }

  if (staff_notes && userRole === 'STAFF') {
    updates.push(`staff_notes = $${paramCount++}`);
    values.push(staff_notes);
  }

  if (admin_notes && userRole === 'ADMIN') {
    updates.push(`admin_notes = $${paramCount++}`);
    values.push(admin_notes);
  }

  if (resolution_details && (userRole === 'ADMIN' || userRole === 'STAFF')) {
    updates.push(`resolution_details = $${paramCount++}`);
    values.push(resolution_details);
  }

  if (updates.length === 0) {
    throw new Error('No valid fields to update');
  }

  values.push(complaintId);
  const result = await query(
    `UPDATE complaints SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );

  return result.rows[0];
};

// Get complaint status history
export const getComplaintHistory = async (complaintId) => {
  const result = await query(
    `SELECT 
      h.*,
      u.first_name,
      u.last_name,
      u.role
     FROM complaint_status_history h
     LEFT JOIN users u ON h.changed_by = u.id
     WHERE h.complaint_id = $1
     ORDER BY h.created_at DESC`,
    [complaintId]
  );

  return result.rows;
};

// Delete complaint (soft delete or hard delete based on role)
export const deleteComplaint = async (complaintId, userRole) => {
  if (userRole !== 'ADMIN') {
    throw new Error('Only admins can delete complaints');
  }

  const result = await query(
    'DELETE FROM complaints WHERE id = $1 RETURNING *',
    [complaintId]
  );

  if (result.rows.length === 0) {
    throw new Error('Complaint not found');
  }

  return result.rows[0];
};
