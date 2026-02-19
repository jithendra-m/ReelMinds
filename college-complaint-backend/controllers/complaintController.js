import { HTTP_STATUS } from '../config/constants.js';
import * as complaintService from '../services/complaintService.js';
import path from 'path';
import { FILE_UPLOAD } from '../config/constants.js';

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Student)
export const createComplaint = async (req, res, next) => {
  try {
    const complaintData = {
      ...req.body,
      image_proof_url: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const complaint = await complaintService.createComplaint(
      complaintData,
      req.user.id
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Complaint created successfully',
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
export const getComplaints = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      category_id: req.query.category_id,
      priority: req.query.priority,
      search: req.query.search,
      assigned_to: req.query.assigned_to,
      student_id: req.query.student_id,
    };

    const pagination = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const result = await complaintService.getComplaints(
      filters,
      pagination,
      req.user.id,
      req.user.role
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result.complaints,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaint = async (req, res, next) => {
  try {
    const complaint = await complaintService.getComplaintById(
      req.params.id,
      req.user.id,
      req.user.role
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private (Staff/Admin)
export const updateComplaint = async (req, res, next) => {
  try {
    const complaint = await complaintService.updateComplaint(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Complaint updated successfully',
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private (Admin)
export const deleteComplaint = async (req, res, next) => {
  try {
    await complaintService.deleteComplaint(req.params.id, req.user.role);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaint status history
// @route   GET /api/complaints/:id/history
// @access  Private
export const getComplaintHistory = async (req, res, next) => {
  try {
    const history = await complaintService.getComplaintHistory(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
