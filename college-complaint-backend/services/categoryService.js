import { query } from '../database/connection.js';

// Get all categories
export const getAllCategories = async (includeInactive = false) => {
  let queryText = 'SELECT * FROM categories';
  const values = [];

  if (!includeInactive) {
    queryText += ' WHERE is_active = true';
  }

  queryText += ' ORDER BY name ASC';

  const result = await query(queryText, values);
  return result.rows;
};

// Get category by ID
export const getCategoryById = async (categoryId) => {
  const result = await query(
    'SELECT * FROM categories WHERE id = $1',
    [categoryId]
  );

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  return result.rows[0];
};

// Create category
export const createCategory = async (categoryData, createdBy) => {
  const { name, description } = categoryData;

  // Check if category already exists
  const existing = await query(
    'SELECT id FROM categories WHERE name = $1',
    [name]
  );

  if (existing.rows.length > 0) {
    throw new Error('Category with this name already exists');
  }

  const result = await query(
    `INSERT INTO categories (name, description, created_by)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, description, createdBy]
  );

  return result.rows[0];
};

// Update category
export const updateCategory = async (categoryId, updateData) => {
  const { name, description, is_active } = updateData;

  const updates = [];
  const values = [];
  let paramCount = 1;

  if (name) {
    // Check if new name conflicts with existing category
    const existing = await query(
      'SELECT id FROM categories WHERE name = $1 AND id != $2',
      [name, categoryId]
    );

    if (existing.rows.length > 0) {
      throw new Error('Category with this name already exists');
    }

    updates.push(`name = $${paramCount++}`);
    values.push(name);
  }

  if (description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(description);
  }

  if (is_active !== undefined) {
    updates.push(`is_active = $${paramCount++}`);
    values.push(is_active);
  }

  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(categoryId);
  const result = await query(
    `UPDATE categories SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${paramCount}
     RETURNING *`,
    values
  );

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  return result.rows[0];
};

// Delete category
export const deleteCategory = async (categoryId) => {
  // Check if category is used in any complaints
  const complaints = await query(
    'SELECT COUNT(*) as count FROM complaints WHERE category_id = $1',
    [categoryId]
  );

  if (parseInt(complaints.rows[0].count) > 0) {
    throw new Error('Cannot delete category. It is being used by complaints.');
  }

  const result = await query(
    'DELETE FROM categories WHERE id = $1 RETURNING *',
    [categoryId]
  );

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  return result.rows[0];
};
