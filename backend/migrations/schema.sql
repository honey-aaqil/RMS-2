-- ============================================================
-- RecruiterMS Database Schema
-- Target: TiDB Cloud (MySQL-compatible)
-- Database: recruiter_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS recruiter_db;
USE recruiter_db;

-- ------------------------------------------------------------
-- Users table — authentication & email verification
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'recruiter', 'candidate') NOT NULL DEFAULT 'recruiter',
    is_verified TINYINT(1) NOT NULL DEFAULT 0,
    verification_token VARCHAR(255) DEFAULT NULL,
    token_expires_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_verification_token (verification_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
