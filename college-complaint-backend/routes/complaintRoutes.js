import express from 'express';
import * as complaintController from '../controllers/complaintController.js';
import { authenticate, authorize, authorizeOwnerOrStaff } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';
import {
  createComplaintValidator,
  updateComplaintValidator,
  getComplaintsValidator,
  complaintIdValidator,
} from '../validators/complaintValidator.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create complaint (Student only)
router.post(
  '/',
  authorize(ROLES.STUDENT),
  uploadSingle,
  handleUploadError,
  createComplaintValidator,
  validate,
  complaintController.createComplaint
);

// Get all complaints (with filters and pagination)
router.get(
  '/',
  getComplaintsValidator,
  validate,
  complaintController.getComplaints
);

// Get single complaint
router.get(
  '/:id',
  complaintIdValidator,
  validate,
  authorizeOwnerOrStaff,
  complaintController.getComplaint
);

// Update complaint (Staff/Admin)
router.put(
  '/:id',
  complaintIdValidator,
  updateComplaintValidator,
  validate,
  authorize(ROLES.STAFF, ROLES.ADMIN),
  complaintController.updateComplaint
);

// Delete complaint (Admin only)
router.delete(
  '/:id',
  complaintIdValidator,
  validate,
  authorize(ROLES.ADMIN),
  complaintController.deleteComplaint
);

// Get complaint history
router.get(
  '/:id/history',
  complaintIdValidator,
  validate,
  authorizeOwnerOrStaff,
  complaintController.getComplaintHistory
);

export default router;
