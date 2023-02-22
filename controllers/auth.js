const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {
        
        // Verificación si existe el correo
        const usuario = await Usuario.findOne({correo});

        if(!usuario) {
            return res.status(404).json({
                msg: 'El correo del usuario no existe en la base de datos'
            });
        }

        // Verificación si el usuario esta activo
        if(usuario.estado === false) {
            return res.status(400).json({
                msg: 'La cuenta del usuario esta inactiva'
            });
        }

        // Verificación si la contraseña es correcta
        const validarPassword = bcryptjs.compareSync( password, usuario.password );
        if(!validarPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );
    
        res.json({
            msg: 'Login Auth Funciona!',
            correo, password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrador'
        });
    }
    
}

module.exports = {
    login
}