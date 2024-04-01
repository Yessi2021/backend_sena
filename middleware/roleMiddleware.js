const authorize = roles => (req, res, next) => {
    if (!roles.includes(req.user.role.Nombre)) {
        console.log(req.user.role);
        return res.status(403).send('No tienes permiso para realizar esta acción');
    }
    next();
};

module.exports = authorize;
