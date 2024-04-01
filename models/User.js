const db = require("../config/db")

class User {
    constructor(name,email,password,idRol){
        this.name =  name;
        this.email = email;
        this.password = password
        this.idRol = idRol
    }

    static findUserByEmail(email) {
        // Usando query en lugar de execute
        return db.query('SELECT * FROM Usuarios WHERE Email = ?', [email]);
    }


save() {
    return db.query(
        'INSERT INTO Usuarios (Nombre, Email, Password, RolID ) VALUES (?, ?, ?, ?)',
        [this.name, this.email, this.password, this.idRol]
    );
}

}

module.exports = User;