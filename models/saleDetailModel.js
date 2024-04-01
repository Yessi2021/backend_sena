const db = require('../config/db');

class  SaleDetail {
    constructor(saleId, productId, quantity, price) {
        this.saleId = saleId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    static findAll() {
        return db.query('SELECT * FROM DetalleVentas');
    }

    static findById(id) {
        return db.query('SELECT * FROM DetalleVentas WHERE ID = ?', [id]);
    }

    save() {
        return db.query(
            'INSERT INTO DetalleVentas (VentaID, ProductoID, Cantidad, Precio) VALUES (?, ?, ?, ?)',
            [this.saleId, this.productId, this.quantity, this.price]
        );
    }

    static update(id, saleId, productId, quantity, price) {
        return db.query(
            'UPDATE DetalleVentas SET VentaID = ?, ProductoID = ?, Cantidad = ?, Precio = ? WHERE ID = ?',
            [saleId, productId, quantity, price, id]
        );
    }

    static delete(id) {
        return db.query('DELETE FROM DetalleVentas WHERE ID = ?', [id]);
    }

    

}


module.exports = SaleDetail;