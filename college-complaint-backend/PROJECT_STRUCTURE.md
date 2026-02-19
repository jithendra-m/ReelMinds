# Project Structure

```
college-complaint-backend/
│
├── config/
│   └── constants.js              # Application-wide constants (roles, statuses, etc.)
│
├── controllers/                  # Request handlers (MVC - Controller)
│   ├── authController.js        # Authentication endpoints
│   ├── complaintController.js    # Complaint CRUD operations
│   ├── categoryController.js     # Category management
│   └── analyticsController.js    # Analytics and reporting
│
├── database/
│   ├── connection.js             # PostgreSQL connection pool
│   └── schema.sql                # Database schema and migrations
│
├── middleware/
│   ├── auth.js                   # JWT authentication & authorization
│   ├── errorHandler.js           # Centralized error handling
│   ├── validation.js             # Request validation middleware
│   └── upload.js                 # File upload handling (Multer)
│
├── routes/                       # API route definitions
│   ├── authRoutes.js             # /api/auth/*
│   ├── complaintRoutes.js        # /api/complaints/*
│   ├── categoryRoutes.js        # /api/categories/*
│   └── analyticsRoutes.js        # /api/analytics/*
│
├── services/                      # Business logic layer (MVC - Model)
│   ├── authService.js            # Authentication business logic
│   ├── complaintService.js       # Complaint business logic
│   ├── categoryService.js        # Category business logic
│   └── analyticsService.js       # Analytics calculations
│
├── validators/                   # Input validation rules
│   ├── authValidator.js          # Auth request validation
│   ├── complaintValidator.js     # Complaint request validation
│   └── categoryValidator.js      # Category request validation
│
├── uploads/                      # Uploaded files directory
│   └── .gitkeep                  # Keep directory in git
│
├── scripts/                      # Utility scripts
│   ├── migrate.js                # Database migration script
│   └── seed.js                   # (Optional) Seed data script
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── server.js                     # Main application entry point
├── README.md                     # Main documentation
├── API_EXAMPLES.md               # API request/response examples
├── DEPLOYMENT.md                 # Deployment guide
└── PROJECT_STRUCTURE.md          # This file

```

## Architecture Overview

### MVC Pattern Implementation

- **Model**: Services layer (`services/`) - Business logic and database operations
- **View**: JSON responses (REST API)
- **Controller**: Controllers layer (`controllers/`) - Request/response handling

### Request Flow

```
Client Request
    ↓
Routes (routes/)
    ↓
Middleware (middleware/)
    ├── Authentication (auth.js)
    ├── Authorization (auth.js)
    ├── Validation (validation.js)
    └── File Upload (upload.js)
    ↓
Controller (controllers/)
    ↓
Service (services/)
    ↓
Database (database/connection.js)
    ↓
Response
```

### Key Components

1. **Authentication Flow**
   - User registers/logs in → JWT token generated
   - Token included in Authorization header
   - Middleware validates token on protected routes
   - Role-based access control enforced

2. **Complaint Flow**
   - Student creates complaint → Status: OPEN
   - Admin assigns to staff → Status: IN_PROGRESS
   - Staff updates/resolves → Status: RESOLVED
   - All status changes logged in history table

3. **File Upload Flow**
   - Multer middleware handles file upload
   - File validated (type, size)
   - Saved to uploads/ directory
   - URL stored in database

4. **Error Handling**
   - Centralized error handler
   - Consistent error response format
   - Proper HTTP status codes
   - Development vs production error details

## Database Schema

### Tables

1. **users** - User accounts (students, staff, admins)
2. **categories** - Complaint categories
3. **complaints** - Main complaints table
4. **complaint_status_history** - Audit trail for status changes

### Relationships

- `complaints.student_id` → `users.id`
- `complaints.assigned_to` → `users.id`
- `complaints.category_id` → `categories.id`
- `complaint_status_history.complaint_id` → `complaints.id`

### Indexes

- Email, role, student_id on users
- Status, priority, category_id, student_id on complaints
- Complaint_id, created_at on history

## Security Features

1. **Helmet.js** - Security headers
2. **CORS** - Cross-origin protection
3. **Rate Limiting** - DDoS protection
4. **JWT** - Secure authentication
5. **bcrypt** - Password hashing
6. **Input Validation** - SQL injection prevention
7. **File Upload Validation** - Malicious file prevention

## Best Practices Implemented

✅ Separation of concerns (MVC)
✅ DRY (Don't Repeat Yourself)
✅ Error handling
✅ Input validation
✅ Security headers
✅ Rate limiting
✅ Database connection pooling
✅ Async/await (no callbacks)
✅ Environment variables
✅ Logging
✅ Code organization
✅ Documentation
