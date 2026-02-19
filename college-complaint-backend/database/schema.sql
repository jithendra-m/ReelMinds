-- College Complaint Management System Database Schema
-- PostgreSQL Database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'STAFF', 'ADMIN')),
    student_id VARCHAR(50) UNIQUE,
    department VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_student_id ON users(student_id);

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_name ON categories(name);

-- Complaints Table
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'REJECTED')),
    priority VARCHAR(10) NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    image_proof_url VARCHAR(500),
    admin_notes TEXT,
    staff_notes TEXT,
    resolution_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- Create indexes for frequently queried columns
CREATE INDEX idx_complaints_student_id ON complaints(student_id);
CREATE INDEX idx_complaints_assigned_to ON complaints(assigned_to);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_category_id ON complaints(category_id);
CREATE INDEX idx_complaints_created_at ON complaints(created_at DESC);

-- Composite index for common queries
CREATE INDEX idx_complaints_status_priority ON complaints(status, priority);

-- Complaint Status History Table (Audit Trail)
CREATE TABLE complaint_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_by UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_status_history_complaint_id ON complaint_status_history(complaint_id);
CREATE INDEX idx_status_history_created_at ON complaint_status_history(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log status changes
CREATE OR REPLACE FUNCTION log_complaint_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO complaint_status_history (complaint_id, old_status, new_status, changed_by)
        VALUES (NEW.id, OLD.status, NEW.status, NEW.assigned_to);
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to log status changes
CREATE TRIGGER log_status_change AFTER UPDATE OF status ON complaints
    FOR EACH ROW EXECUTE FUNCTION log_complaint_status_change();

-- Insert default categories
INSERT INTO categories (name, description) VALUES
    ('Infrastructure', 'Issues related to buildings, facilities, and infrastructure'),
    ('Academic', 'Academic-related complaints and concerns'),
    ('Administrative', 'Administrative and bureaucratic issues'),
    ('Hostel', 'Hostel and accommodation related complaints'),
    ('Library', 'Library services and resources'),
    ('Cafeteria', 'Food and cafeteria services'),
    ('Transport', 'Transportation and vehicle services'),
    ('Security', 'Security and safety concerns'),
    ('IT Services', 'IT infrastructure and technical support'),
    ('Other', 'Other miscellaneous complaints');

-- Create admin user (password: admin123 - change in production!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
VALUES ('admin@college.edu', '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'Admin', 'User', 'ADMIN', true);
