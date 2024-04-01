const db = require('../config/db');

class Sale {
    constructor(userId, date, total, stripePaymentIntentId) {
        this.userId = userId;
        this.date = date;
        this.total = total;
        this.stripePaymentIntentId = stripePaymentIntentId;
    }

    static async create({ userId, total, stripePaymentIntentId }) {
        const [result] = await db.query(
            'INSERT INTO Ventas (UsuarioID, Fecha, Total, StripePaymentIntentID) VALUES (?, NOW(), ?, ?)',
            [userId, total, stripePaymentIntentId]
        );
        return result.insertId;
    }

  
}

module.exports = Sale;
