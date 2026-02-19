import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} from '../validators/categoryValidator.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryIdValidator, validate, categoryController.getCategory);

// Admin only routes
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  createCategoryValidator,
  validate,
  categoryController.createCategory
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  categoryIdValidator,
  updateCategoryValidator,
  validate,
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.ADMIN),
  categoryIdValidator,
  validate,
  categoryController.deleteCategory
);

export default router;
