const db = require('../config/db');

class Product {

    constructor(name, description, price, stock, categoryId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }


    static findAll() {
        return db.query('SELECT * FROM Productos');
    }

    static findById(id) {
        return db.query('SELECT * FROM Productos WHERE ID = ?', [id]);
    }

    save() {
        return db.query(
            'INSERT INTO Productos (Nombre, Descripcion, Precio, CantidadStock, CategoriaID) VALUES (?, ?, ?, ?, ?)',
            [this.name, this.description, this.price, this.stock, this.categoryId]
        );
    }

    static update(id, name, description, price, stock, categoryId) {
        return db.query(
            'UPDATE Productos SET Nombre = ?, Descripcion = ?, Precio = ?, CantidadStock = ?, CategoriaID = ? WHERE ID = ?',
            [name, description, price, stock, categoryId, id]
        );
    }

    static delete(id) {
        return db.query('DELETE FROM Productos WHERE ID = ?', [id]);
    }


}

module.exports = Product;