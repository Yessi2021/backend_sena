const db = require('../config/db');

class Category {
    constructor(name, description){
        this.name = name;
        this.description = description
    }

    static async findAll(){
        return db.query("SELECT * FROM Categorias");
    }

static async findById(id){
    const [category] = await db.query( "SELECT * FROM Categorias WHERE ID = ?", [id])
    return category;
}

static async createCategory( name, description){
    return db.query(" INSERT INTO categorias (Nombre, Descripcion) VALUES (?, ? )", [name, description])
}

static async updateCategory(id, name,decription){
    return db.query(
        'UPDATE Categorias SET Nombre = ?, Descripcion = ? WHERE ID = ?',
        [name, decription, id]
    );
}

static async deleteCategory(id){
     return db.query('DELETE FROM Categorias WHERE ID = ?', [id]);
}


}


module.exports = Category;  