
const Sale = require('../models/saleModel');
const stripe = require('../config/stripe');

class SaleController {
    static async finalizeSale(req, res) {
        try {
            const { userId, products } = req.body;
            const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

            // Convertir productos a line_items para Stripe
            const lineItems = products.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            }));

            // Crear una sesión de checkout con Stripe
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${process.env.PAYMENT_DOMAIN}/success`,
                cancel_url: `${process.env.PAYMENT_DOMAIN}/cancel`,
            });

            // Registrar la venta en la base de datos
            const saleId = await Sale.create({
                userId,
                total,
                stripeSessionId: session.id 
            });

            // Devolver la URL de la sesión para redirigir al cliente
            res.json({ url: session.url });
        } catch (error) {
            console.error('Error al finalizar la venta: ', error);
            res.status(500).send('Error al finalizar la venta.');
        }
    }
}


module.exports = SaleController