-- Database Schema for Sistema de Avaliação Bíblica
-- Compatible with MySQL/MariaDB

CREATE DATABASE IF NOT EXISTS biblical_evaluation_db;
USE biblical_evaluation_db;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    setor VARCHAR(100),
    congregacao VARCHAR(100),
    idade INT,
    senha_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'blocked') DEFAULT 'active',
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Questions Table
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Options Table (4 options per question)
CREATE TABLE question_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- 4. Exam Attempts/Sessions
CREATE TABLE exam_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    status ENUM('in_progress', 'submitted', 'blocked') DEFAULT 'in_progress',
    score DECIMAL(5,2) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. User Answers (Tracking individual responses)
CREATE TABLE user_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    selected_option_id INT, -- NULL if skipped
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES question_options(id)
);

-- 6. System Settings (for global toggles like Quiz Active)
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value VARCHAR(255)
);

-- Initial Mock Data (Optional - for testing)
INSERT INTO questions (question_text) VALUES 
('Quem foi o pai de Isaque?'),
('Quantos anos Jesus tinha quando começou seu ministério?'),
('Qual o último livro da Bíblia?');

-- Options for Question 1
-- Assuming IDs 1, 2, 3... generated sequentially. 
-- In production, handle IDs dynamically. This is just for structure example.
