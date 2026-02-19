import { HTTP_STATUS } from '../config/constants.js';

// Centralized error handling middleware
export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err);

  // PostgreSQL errors
  if (err.code === '23505') {
    // Unique violation
    const message = 'Duplicate entry. This record already exists.';
    error = { message, statusCode: HTTP_STATUS.CONFLICT };
  }

  if (err.code === '23503') {
    // Foreign key violation
    const message = 'Referenced record does not exist.';
    error = { message, statusCode: HTTP_STATUS.BAD_REQUEST };
  }

  if (err.code === '23502') {
    // Not null violation
    const message = 'Required field is missing.';
    error = { message, statusCode: HTTP_STATUS.BAD_REQUEST };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token.';
    error = { message, statusCode: HTTP_STATUS.UNAUTHORIZED };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired.';
    error = { message, statusCode: HTTP_STATUS.UNAUTHORIZED };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: HTTP_STATUS.BAD_REQUEST };
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File size too large. Maximum size is 5MB.';
    error = { message, statusCode: HTTP_STATUS.BAD_REQUEST };
  }

  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// 404 handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(HTTP_STATUS.NOT_FOUND);
  next(error);
};
