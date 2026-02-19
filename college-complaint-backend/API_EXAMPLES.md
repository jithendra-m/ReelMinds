# API Request/Response Examples

## Authentication

### 1. Register Student

**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "john.doe@college.edu",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "STUDENT",
  "student_id": "STU2024001",
  "department": "Computer Science",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john.doe@college.edu",
    "first_name": "John",
    "last_name": "Doe",
    "role": "STUDENT",
    "student_id": "STU2024001",
    "department": "Computer Science",
    "phone": "+1234567890",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Login

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@college.edu",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "john.doe@college.edu",
      "first_name": "John",
      "last_name": "Doe",
      "role": "STUDENT",
      "student_id": "STU2024001",
      "department": "Computer Science",
      "phone": "+1234567890",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Complaints

### 3. Create Complaint

**Request:**
```http
POST /api/complaints
Authorization: Bearer {student_token}
Content-Type: multipart/form-data

title: "Broken Wi-Fi in Library"
description: "The Wi-Fi connection is extremely slow in the library area, making it difficult to access online resources and complete assignments."
category_id: "660e8400-e29b-41d4-a716-446655440000"
priority: "MEDIUM"
image_proof: [binary file]
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Complaint created successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "title": "Broken Wi-Fi in Library",
    "description": "The Wi-Fi connection is extremely slow...",
    "category_id": "660e8400-e29b-41d4-a716-446655440000",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "assigned_to": null,
    "status": "OPEN",
    "priority": "MEDIUM",
    "image_proof_url": "/uploads/wifi-issue-1234567890.jpg",
    "admin_notes": null,
    "staff_notes": null,
    "resolution_details": null,
    "created_at": "2024-01-15T11:00:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z",
    "resolved_at": null
  }
}
```

### 4. Get All Complaints (Student View)

**Request:**
```http
GET /api/complaints?page=1&limit=10&status=OPEN
Authorization: Bearer {student_token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "title": "Broken Wi-Fi in Library",
      "description": "The Wi-Fi connection is extremely slow...",
      "status": "OPEN",
      "priority": "MEDIUM",
      "category_name": "IT Services",
      "student_first_name": "John",
      "student_last_name": "Doe",
      "student_id": "STU2024001",
      "created_at": "2024-01-15T11:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### 5. Get Single Complaint

**Request:**
```http
GET /api/complaints/770e8400-e29b-41d4-a716-446655440000
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "title": "Broken Wi-Fi in Library",
    "description": "The Wi-Fi connection is extremely slow...",
    "category_id": "660e8400-e29b-41d4-a716-446655440000",
    "category_name": "IT Services",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "student_first_name": "John",
    "student_last_name": "Doe",
    "student_email": "john.doe@college.edu",
    "student_id": "STU2024001",
    "assigned_to": "880e8400-e29b-41d4-a716-446655440000",
    "staff_first_name": "Jane",
    "staff_last_name": "Smith",
    "staff_email": "jane.smith@college.edu",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "image_proof_url": "/uploads/wifi-issue-1234567890.jpg",
    "admin_notes": null,
    "staff_notes": "Investigating network infrastructure",
    "resolution_details": null,
    "created_at": "2024-01-15T11:00:00.000Z",
    "updated_at": "2024-01-15T14:30:00.000Z",
    "resolved_at": null
  }
}
```

### 6. Update Complaint (Staff/Admin)

**Request:**
```http
PUT /api/complaints/770e8400-e29b-41d4-a716-446655440000
Authorization: Bearer {staff_token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "staff_notes": "Network team has been notified. Checking router configuration."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Complaint updated successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "staff_notes": "Network team has been notified...",
    "updated_at": "2024-01-15T14:30:00.000Z"
  }
}
```

### 7. Assign Complaint (Admin)

**Request:**
```http
PUT /api/complaints/770e8400-e29b-41d4-a716-446655440000
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "assigned_to": "880e8400-e29b-41d4-a716-446655440000",
  "priority": "HIGH"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Complaint updated successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "assigned_to": "880e8400-e29b-41d4-a716-446655440000",
    "priority": "HIGH",
    "updated_at": "2024-01-15T15:00:00.000Z"
  }
}
```

### 8. Resolve Complaint

**Request:**
```http
PUT /api/complaints/770e8400-e29b-41d4-a716-446655440000
Authorization: Bearer {staff_token}
Content-Type: application/json

{
  "status": "RESOLVED",
  "resolution_details": "Router configuration updated. Wi-Fi speed improved by 80%. Network monitoring in place."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Complaint updated successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "status": "RESOLVED",
    "resolution_details": "Router configuration updated...",
    "resolved_at": "2024-01-16T10:00:00.000Z",
    "updated_at": "2024-01-16T10:00:00.000Z"
  }
}
```

### 9. Get Complaint History

**Request:**
```http
GET /api/complaints/770e8400-e29b-41d4-a716-446655440000/history
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440000",
      "complaint_id": "770e8400-e29b-41d4-a716-446655440000",
      "old_status": "OPEN",
      "new_status": "IN_PROGRESS",
      "changed_by": "880e8400-e29b-41d4-a716-446655440000",
      "first_name": "Jane",
      "last_name": "Smith",
      "role": "STAFF",
      "notes": null,
      "created_at": "2024-01-15T14:30:00.000Z"
    },
    {
      "id": "aa0e8400-e29b-41d4-a716-446655440000",
      "complaint_id": "770e8400-e29b-41d4-a716-446655440000",
      "old_status": "IN_PROGRESS",
      "new_status": "RESOLVED",
      "changed_by": "880e8400-e29b-41d4-a716-446655440000",
      "first_name": "Jane",
      "last_name": "Smith",
      "role": "STAFF",
      "notes": null,
      "created_at": "2024-01-16T10:00:00.000Z"
    }
  ]
}
```

## Categories

### 10. Get All Categories

**Request:**
```http
GET /api/categories
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Infrastructure",
      "description": "Issues related to buildings, facilities, and infrastructure",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "661e8400-e29b-41d4-a716-446655440000",
      "name": "IT Services",
      "description": "IT infrastructure and technical support",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Analytics (Admin Only)

### 11. Get Comprehensive Analytics

**Request:**
```http
GET /api/analytics
Authorization: Bearer {admin_token}
```

**Response (200 OK):**
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
      {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "name": "Infrastructure",
        "count": 50
      },
      {
        "id": "661e8400-e29b-41d4-a716-446655440000",
        "name": "IT Services",
        "count": 30
      },
      {
        "id": "662e8400-e29b-41d4-a716-446655440000",
        "name": "Academic",
        "count": 25
      }
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
        "id": "880e8400-e29b-41d4-a716-446655440000",
        "first_name": "Jane",
        "last_name": "Smith",
        "assigned_count": 15,
        "resolved_count": 12
      },
      {
        "id": "881e8400-e29b-41d4-a716-446655440000",
        "first_name": "Bob",
        "last_name": "Johnson",
        "assigned_count": 10,
        "resolved_count": 8
      }
    ]
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Complaint not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server Error",
  "stack": "Error stack trace (development only)"
}
```
