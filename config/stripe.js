const Stripe = require('stripe');

// Inicializar Stripe con tu clave secreta de API.
// La clave API se almacena de manera segura como una variable de entorno.
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

module.exports = stripe;
