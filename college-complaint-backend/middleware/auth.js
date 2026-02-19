import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../config/constants.js';

// Verify JWT token
export const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Token expired. Please login again.',
      });
    }
    
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

// Role-based access control middleware
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

// Check if user owns the resource or is admin/staff
export const authorizeOwnerOrStaff = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Admin and Staff can access any complaint
    if (userRole === 'ADMIN' || userRole === 'STAFF') {
      return next();
    }

    // Students can only access their own complaints
    if (userRole === 'STUDENT') {
      // The route handler should check ownership
      return next();
    }

    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: 'Access denied.',
    });
  } catch (error) {
    next(error);
  }
};
