const Role = require('../models/RolesModel');

class RoleController {

    static async getAllRoles(req, res) {
        try {
            const [roles] = await Role.findAll();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).send('Error al obtener los roles');
        }
    }

    static async createRole(req, res) {
        try {
            const { name } = req.body;
            await Role.create(name);
            res.status(201).send('Rol creado con éxito');
        } catch (error) {
            res.status(500).send('Error al crear el rol');
        }
    }

}

module.exports = RoleController;


module.exports = RoleController;