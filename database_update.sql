-- Database Update for Admin Features
-- Run this in your Hostinger phpMyAdmin

USE u575119663_vest;

-- 1. Add is_admin column to users table
ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- 2. Create System Settings table for global controls (like Quiz Start/Stop)
CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Insert default Quiz Active setting (Default: Active)
INSERT INTO system_settings (setting_key, setting_value) VALUES ('quiz_active', 'true');

-- 4. Insert or Update Default Admin User
-- We use ON DUPLICATE KEY UPDATE to ensure it works even if email exists
INSERT INTO users (nome, email, setor, congregacao, idade, senha_hash, is_admin, status) 
VALUES ('Administrador', 'misaelta.contato@gmail.com', 'TI', 'Sede', 30, '123456', TRUE, 'active')
ON DUPLICATE KEY UPDATE 
    is_admin = TRUE, 
    senha_hash = '123456',
    status = 'active';

-- 5. Ensure existing users are NOT admins (safety check)
UPDATE users SET is_admin = FALSE WHERE email != 'misaelta.contato@gmail.com';
