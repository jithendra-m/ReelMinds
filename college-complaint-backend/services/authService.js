import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database/connection.js';
import { ROLES } from '../config/constants.js';

// Register new user
export const registerUser = async (userData) => {
  const { email, password, first_name, last_name, role, student_id, department, phone } = userData;

  // Check if user already exists
  const existingUser = await query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error('User with this email already exists');
  }

  // Check if student_id already exists (if provided)
  if (student_id) {
    const existingStudent = await query(
      'SELECT id FROM users WHERE student_id = $1',
      [student_id]
    );

    if (existingStudent.rows.length > 0) {
      throw new Error('Student ID already exists');
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Insert user
  const result = await query(
    `INSERT INTO users (email, password_hash, first_name, last_name, role, student_id, department, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, email, first_name, last_name, role, student_id, department, phone, created_at`,
    [email, password_hash, first_name, last_name, role || ROLES.STUDENT, student_id, department, phone]
  );

  return result.rows[0];
};

// Login user
export const loginUser = async (email, password) => {
  // Find user by email
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result.rows[0];

  // Check if user is active
  if (!user.is_active) {
    throw new Error('Account is deactivated. Please contact administrator.');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );

  // Remove password from user object
  const { password_hash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};

// Get user by ID
export const getUserById = async (userId) => {
  const result = await query(
    `SELECT id, email, first_name, last_name, role, student_id, department, phone, is_active, created_at
     FROM users WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};

// Update user profile
export const updateUserProfile = async (userId, updateData) => {
  const { first_name, last_name, phone, department } = updateData;

  const updates = [];
  const values = [];
  let paramCount = 1;

  if (first_name) {
    updates.push(`first_name = $${paramCount++}`);
    values.push(first_name);
  }
  if (last_name) {
    updates.push(`last_name = $${paramCount++}`);
    values.push(last_name);
  }
  if (phone) {
    updates.push(`phone = $${paramCount++}`);
    values.push(phone);
  }
  if (department) {
    updates.push(`department = $${paramCount++}`);
    values.push(department);
  }

  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(userId);
  const result = await query(
    `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${paramCount}
     RETURNING id, email, first_name, last_name, role, student_id, department, phone, created_at, updated_at`,
    values
  );

  return result.rows[0];
};
