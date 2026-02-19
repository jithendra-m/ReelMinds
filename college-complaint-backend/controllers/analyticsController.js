import { HTTP_STATUS } from '../config/constants.js';
import * as analyticsService from '../services/analyticsService.js';

// @desc    Get comprehensive analytics
// @route   GET /api/analytics
// @access  Private (Admin)
export const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await analyticsService.getComprehensiveAnalytics();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get total complaints
// @route   GET /api/analytics/total
// @access  Private (Admin)
export const getTotalComplaints = async (req, res, next) => {
  try {
    const total = await analyticsService.getTotalComplaints();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { total },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaints by status
// @route   GET /api/analytics/status
// @access  Private (Admin)
export const getComplaintsByStatus = async (req, res, next) => {
  try {
    const data = await analyticsService.getComplaintsByStatus();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaints by category
// @route   GET /api/analytics/category
// @access  Private (Admin)
export const getComplaintsByCategory = async (req, res, next) => {
  try {
    const data = await analyticsService.getComplaintsByCategory();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
