-- SQL Script para corrigir/garantir as colunas de tempo e pontuação
-- Rode este script no phpMyAdmin (Banco: u575119663_vest)

USE u575119663_vest;

-- 1. Garante que a tabela exam_attempts tem as colunas corretas de tempo e score
ALTER TABLE exam_attempts 
MODIFY COLUMN start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN end_time TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS score DECIMAL(5,2) DEFAULT NULL;

-- 2. (Opcional) Caso o Hostinger use uma versão muito antiga do MySQL onde o 'ADD COLUMN IF NOT EXISTS' não funcione:
-- Se o comando acima der erro, tente rodar apenas as linhas de MODIFY abaixo:
/*
ALTER TABLE exam_attempts MODIFY COLUMN start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE exam_attempts MODIFY COLUMN end_time TIMESTAMP NULL;
ALTER TABLE exam_attempts ADD COLUMN score DECIMAL(5,2) DEFAULT NULL;
*/

-- 3. Caso queira resetar os usuários bloqueados por engano durante os testes:
UPDATE users SET status = 'active' WHERE status = 'blocked';
UPDATE exam_attempts SET status = 'in_progress' WHERE status = 'blocked';
