const db = require('../config/db');

class Role {
    constructor(name){
        this.name = name
    }

    static async findAll() {
        return db.query('SELECT * FROM roles');
    }

    static async findById(id) {
        const [role] = await db.query('SELECT Nombre FROM roles WHERE ID = ?', [id]);
        return role;
    }
    static async create(name) {
        return db.query('INSERT INTO roles (Nombre) VALUES (?)', [name]);
    }

}

module.exports = Role;