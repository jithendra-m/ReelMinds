import { body, query, param } from 'express-validator';
import { COMPLAINT_STATUS, PRIORITY } from '../config/constants.js';

export const createComplaintValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 255 })
    .withMessage('Title must be between 5 and 255 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('category_id')
    .optional()
    .isUUID()
    .withMessage('Invalid category ID'),
  body('priority')
    .optional()
    .isIn([PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH])
    .withMessage('Invalid priority level'),
];

export const updateComplaintValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid complaint ID'),
  body('status')
    .optional()
    .isIn([COMPLAINT_STATUS.OPEN, COMPLAINT_STATUS.IN_PROGRESS, COMPLAINT_STATUS.RESOLVED, COMPLAINT_STATUS.REJECTED])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn([PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH])
    .withMessage('Invalid priority level'),
  body('assigned_to')
    .optional()
    .isUUID()
    .withMessage('Invalid user ID'),
  body('staff_notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Staff notes must be less than 1000 characters'),
  body('admin_notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Admin notes must be less than 1000 characters'),
  body('resolution_details')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Resolution details must be less than 2000 characters'),
];

export const getComplaintsValidator = [
  query('status')
    .optional()
    .isIn([COMPLAINT_STATUS.OPEN, COMPLAINT_STATUS.IN_PROGRESS, COMPLAINT_STATUS.RESOLVED, COMPLAINT_STATUS.REJECTED])
    .withMessage('Invalid status'),
  query('priority')
    .optional()
    .isIn([PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH])
    .withMessage('Invalid priority level'),
  query('category_id')
    .optional()
    .isUUID()
    .withMessage('Invalid category ID'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search term must be at least 2 characters'),
];

export const complaintIdValidator = [
  param('id')
    .isUUID()
    .withMessage('Invalid complaint ID'),
];
