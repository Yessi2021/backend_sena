const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).send('Se requiere un token para autenticación');
    }

    try {

        const decoded =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.user = decoded; // Agrega la información decodificada del token a la solicitud
        // console.log(req.user);
        next();

    } catch (error) {
        res.status(401).send('Token inválido o expirado');
    }

}



module.exports = authenticate;