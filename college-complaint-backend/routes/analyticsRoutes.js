import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorize(ROLES.ADMIN));

router.get('/', analyticsController.getAnalytics);
router.get('/total', analyticsController.getTotalComplaints);
router.get('/status', analyticsController.getComplaintsByStatus);
router.get('/category', analyticsController.getComplaintsByCategory);

export default router;
