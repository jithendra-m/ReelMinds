import { HTTP_STATUS } from '../config/constants.js';
import * as categoryService from '../services/categoryService.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const includeInactive = req.query.include_inactive === 'true';
    const categories = await categoryService.getAllCategories(includeInactive);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Admin)
export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(
      req.body,
      req.user.id
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
