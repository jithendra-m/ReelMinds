// Application Constants

export const ROLES = {
  STUDENT: 'STUDENT',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN',
};

export const COMPLAINT_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

export const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const FILE_UPLOAD = {
  MAX_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
  ALLOWED_TYPES: (process.env.ALLOWED_FILE_TYPES || 'jpg,jpeg,png,pdf').split(','),
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};
