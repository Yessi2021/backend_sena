const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/RolesModel');
const GeneradorJWT = require('../helpers/generateJWT');

const secretKey = process.env.SECRETORPRIVATEKEY;
const generadorJWT = new GeneradorJWT(secretKey);

class UserController {
    static async register(req,res){
        try {
            const { name, email, password, idRolId } = req.body
            const [userExist] =  await User.findUserByEmail(email);
            if(userExist.length > 0){
                return res.status(409).json('El usuario ya existe.');  
            }
            // /NOTA EL ID QUE ESTAMOS ENVIANDO NO LO ESTAMOS CAPTURANDO AUN
            const hashedPassword = await bcrypt.hash(password,8)
            const user =  new User(name,email,hashedPassword, idRolId)
             const savedUser = await user.save();
             const username =  savedUser.Nombre
            console.log(idRolId);
             const token = await generadorJWT.generarJWT(savedUser.id);
        
            res.status(201).json({msg: "Usuario registrado exitoxamente!",token, username});
        } catch (error) {
            console.log(error);
        }
    }

static async login(req,res){
    const { email, password } = req.body;
    const [[user]] = await User.findUserByEmail(email)

    if (!user) {
        return res.status(401).send('Credenciales incorrectas.');
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
        return res.status(401).json('Credenciales incorrectas.');
    }


      // Consulta para obtener el nombre del rol basado en el RolID del usuario
    const [role] = await Role.findById(user.RolId)
    console.log(role);
    

    const username =  user.Nombre
    const token = await generadorJWT.generarJWT(user.id, role);
    res.status(200).json({msg:"Login exitoso!",username, token });

}

}

module.exports = UserController;