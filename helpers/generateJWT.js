// GeneradorJWT.js
const jwt = require('jsonwebtoken');

class GeneradorJWT {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generarJWT(id ,role) {
        return new Promise((resolve, reject) => {
            const payload = { id, role };
            jwt.sign(payload, this.secretKey, {
                expiresIn: '4h',
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el TOKEN');
                } else {
                    resolve(token);
                }
            });
        });
    }
}

module.exports = GeneradorJWT;
