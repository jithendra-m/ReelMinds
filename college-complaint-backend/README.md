# College Complaint Management System - Backend API

A production-ready Node.js + Express + PostgreSQL backend for managing college complaints with role-based access control.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - STUDENT, STAFF, ADMIN roles
- **Complaint Management** - Create, view, update, and track complaints
- **File Upload** - Image proof upload with Multer
- **Priority System** - LOW, MEDIUM, HIGH priority levels
- **Status Tracking** - OPEN, IN_PROGRESS, RESOLVED, REJECTED
- **Analytics** - Comprehensive analytics and reporting
- **Pagination & Filtering** - Efficient data retrieval
- **Audit Trail** - Complete status change history

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd college-complaint-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=college_complaints
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE college_complaints;
   ```

5. **Run database migrations**
   ```bash
   psql -U postgres -d college_complaints -f database/schema.sql
   ```
   
   Or use the migration script:
   ```bash
   npm run migrate
   ```

6. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

## 🏃 Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📁 Project Structure

```
college-complaint-backend/
├── config/
│   └── constants.js          # Application constants
├── controllers/               # Request handlers
│   ├── authController.js
│   ├── complaintController.js
│   ├── categoryController.js
│   └── analyticsController.js
├── database/
│   ├── connection.js          # PostgreSQL connection pool
│   └── schema.sql             # Database schema
├── middleware/
│   ├── auth.js                # Authentication & authorization
│   ├── errorHandler.js        # Error handling
│   ├── validation.js          # Request validation
│   └── upload.js              # File upload handling
├── routes/
│   ├── authRoutes.js
│   ├── complaintRoutes.js
│   ├── categoryRoutes.js
│   └── analyticsRoutes.js
├── services/                  # Business logic
│   ├── authService.js
│   ├── complaintService.js
│   ├── categoryService.js
│   └── analyticsService.js
├── validators/                # Input validation rules
│   ├── authValidator.js
│   ├── complaintValidator.js
│   └── categoryValidator.js
├── uploads/                   # Uploaded files directory
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── server.js                  # Main server file
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "student@college.edu",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "STUDENT",
  "student_id": "STU001",
  "department": "Computer Science",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@college.edu",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@college.edu",
      "first_name": "John",
      "last_name": "Doe",
      "role": "STUDENT"
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Complaint Endpoints

#### Create Complaint
```http
POST /api/complaints
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Broken Wi-Fi in Library",
  "description": "The Wi-Fi connection is very slow in the library area",
  "category_id": "uuid",
  "priority": "MEDIUM",
  "image_proof": [file]
}
```

#### Get All Complaints (with filters)
```http
GET /api/complaints?status=OPEN&priority=HIGH&page=1&limit=10&search=wifi
Authorization: Bearer {token}
```

**Query Parameters:**
- `status`: OPEN, IN_PROGRESS, RESOLVED, REJECTED
- `priority`: LOW, MEDIUM, HIGH
- `category_id`: UUID
- `assigned_to`: UUID (Admin/Staff only)
- `student_id`: UUID (Admin only)
- `search`: Search term
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

#### Get Single Complaint
```http
GET /api/complaints/:id
Authorization: Bearer {token}
```

#### Update Complaint
```http
PUT /api/complaints/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "assigned_to": "staff_uuid",
  "staff_notes": "Investigating the issue"
}
```

#### Get Complaint History
```http
GET /api/complaints/:id/history
Authorization: Bearer {token}
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories
```

#### Create Category (Admin only)
```http
POST /api/categories
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Infrastructure",
  "description": "Building and facility issues"
}
```

### Analytics Endpoints (Admin only)

#### Get Comprehensive Analytics
```http
GET /api/analytics
Authorization: Bearer {admin_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byStatus": [
      { "status": "OPEN", "count": 45 },
      { "status": "IN_PROGRESS", "count": 30 },
      { "status": "RESOLVED", "count": 70 },
      { "status": "REJECTED", "count": 5 }
    ],
    "byCategory": [
      { "id": "uuid", "name": "Infrastructure", "count": 50 },
      { "id": "uuid", "name": "Academic", "count": 30 }
    ],
    "byPriority": [
      { "priority": "HIGH", "count": 20 },
      { "priority": "MEDIUM", "count": 100 },
      { "priority": "LOW", "count": 30 }
    ],
    "recent": 25,
    "resolutionRate": {
      "resolved": 70,
      "total": 150,
      "rate": 46.67
    },
    "avgResolutionTime": 5.5,
    "byStaff": [
      {
        "id": "uuid",
        "first_name": "Jane",
        "last_name": "Smith",
        "assigned_count": 15,
        "resolved_count": 12
      }
    ]
  }
}
```

## 🔒 Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Express-validator
- **Password Hashing** - bcryptjs
- **JWT Tokens** - Secure authentication
- **File Upload Validation** - Type and size checks

## 🧪 Testing

Test the API using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🚢 Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up SSL/TLS
4. Configure proper CORS origins
5. Use environment-specific database credentials
6. Set up proper logging
7. Configure backup strategies

## 📄 License

ISC

## 👥 Support

For issues and questions, please open an issue in the repository.
