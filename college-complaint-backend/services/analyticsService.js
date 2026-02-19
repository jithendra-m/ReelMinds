import { query } from '../database/connection.js';

// Get total complaints count
export const getTotalComplaints = async () => {
  const result = await query('SELECT COUNT(*) as total FROM complaints');
  return parseInt(result.rows[0].total);
};

// Get complaints by status
export const getComplaintsByStatus = async () => {
  const result = await query(
    `SELECT status, COUNT(*) as count
     FROM complaints
     GROUP BY status
     ORDER BY status`
  );
  return result.rows;
};

// Get complaints by category
export const getComplaintsByCategory = async () => {
  const result = await query(
    `SELECT 
      c.id,
      c.name,
      COUNT(co.id) as count
     FROM categories c
     LEFT JOIN complaints co ON c.id = co.category_id
     WHERE c.is_active = true
     GROUP BY c.id, c.name
     ORDER BY count DESC, c.name ASC`
  );
  return result.rows;
};

// Get complaints by priority
export const getComplaintsByPriority = async () => {
  const result = await query(
    `SELECT priority, COUNT(*) as count
     FROM complaints
     GROUP BY priority
     ORDER BY priority`
  );
  return result.rows;
};

// Get recent complaints (last 30 days)
export const getRecentComplaints = async (days = 30) => {
  const result = await query(
    `SELECT COUNT(*) as count
     FROM complaints
     WHERE created_at >= CURRENT_DATE - INTERVAL '${days} days'`
  );
  return parseInt(result.rows[0].count);
};

// Get resolution rate
export const getResolutionRate = async () => {
  const result = await query(
    `SELECT 
      COUNT(*) FILTER (WHERE status = 'RESOLVED') as resolved,
      COUNT(*) as total
     FROM complaints`
  );

  const resolved = parseInt(result.rows[0].resolved);
  const total = parseInt(result.rows[0].total);
  const rate = total > 0 ? ((resolved / total) * 100).toFixed(2) : 0;

  return {
    resolved,
    total,
    rate: parseFloat(rate),
  };
};

// Get average resolution time (in days)
export const getAverageResolutionTime = async () => {
  const result = await query(
    `SELECT 
      AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 86400) as avg_days
     FROM complaints
     WHERE status = 'RESOLVED' AND resolved_at IS NOT NULL`
  );

  const avgDays = result.rows[0].avg_days;
  return avgDays ? parseFloat(avgDays).toFixed(2) : 0;
};

// Get complaints by staff member
export const getComplaintsByStaff = async () => {
  const result = await query(
    `SELECT 
      u.id,
      u.first_name,
      u.last_name,
      COUNT(c.id) as assigned_count,
      COUNT(c.id) FILTER (WHERE c.status = 'RESOLVED') as resolved_count
     FROM users u
     LEFT JOIN complaints c ON u.id = c.assigned_to
     WHERE u.role = 'STAFF'
     GROUP BY u.id, u.first_name, u.last_name
     ORDER BY assigned_count DESC`
  );
  return result.rows;
};

// Get comprehensive analytics
export const getComprehensiveAnalytics = async () => {
  const [
    total,
    byStatus,
    byCategory,
    byPriority,
    recent,
    resolutionRate,
    avgResolutionTime,
    byStaff,
  ] = await Promise.all([
    getTotalComplaints(),
    getComplaintsByStatus(),
    getComplaintsByCategory(),
    getComplaintsByPriority(),
    getRecentComplaints(),
    getResolutionRate(),
    getAverageResolutionTime(),
    getComplaintsByStaff(),
  ]);

  return {
    total,
    byStatus,
    byCategory,
    byPriority,
    recent,
    resolutionRate,
    avgResolutionTime: parseFloat(avgResolutionTime),
    byStaff,
  };
};
