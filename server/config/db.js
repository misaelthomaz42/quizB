import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

promisePool.getConnection()
    .then(conn => {
        console.log("Database connected successfully to " + process.env.DB_HOST);
        conn.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

export default promisePool;
