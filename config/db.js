// src/config/db.js
const mysql = require('mysql2');

// Usando variables de entorno para proteger tus credenciales
require('dotenv').config();

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

    query(sql, params) {
        return this.pool.execute(sql, params);
    }

    close() {
        return this.pool.end();
    }
}

const database = new Database();

module.exports = database;

