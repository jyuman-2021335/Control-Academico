//Importación
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {

    //Condición que busca solo los usuarios activos(que esten en estado true)
    const query = {estado: true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de Usuarios',
        listaUsuarios
    });
}

const postRegistroUsuario = async (req = request, res = response) => {

    const {nombre, correo, password} = req.body;
    const usuarioDB = new Usuario({nombre, correo, password});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar el nuevo usuario en la DB
    await usuarioDB.save();

    res.status(200).json({
        msg: 'Registro Exitoso',
        usuarioDB
    });
}

const postUsuario = async (req = request, res = respones) => {

    const {nombre, correo, password, carne, rol} = req.body;
    const usuarioDB = new Usuario({nombre, correo, password, carne, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar el nuevo usuario en la DB
    await usuarioDB.save();

    res.status(200).json({
        msg: 'POST API de Usuarios',
        usuarioDB
    });

}

const putUsuario = async (req = request, res = response) => {

    const {id} = req.params;

    //Ignoramos el _id(id de Mongo), carne, estado al momento de editar y mandar la petición en el req.body
    const {_id, carne, estado, ...resto} = req.body;

    //Encriptar la contraseña 
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //Editar y guardar el usuario
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Usuarios',
        usuarioEditado
    }); 

}

const deleteUsuario = async (req = request, res = response) => {
    
    const {id} = req.params;

    //Eliminar al usuario y guardar
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API de Usuarios',
        usuarioEliminado
    });

}


module.exports = {
    getUsuarios,
    postRegistroUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}