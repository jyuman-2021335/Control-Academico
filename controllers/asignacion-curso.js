const {response, request} = require('express');

//Modelos
const Asignacion = require('../models/asignacion-curso');

const getAsignacion = async (req = request, res = response) => {
    const {params} = req.params;
    const listaAsignacion = await Promise.all([
        Asignacion.countDocuments(params),
        Asignacion.find(params).populate('curso', 'nombre').populate('usuario', 'nombre')
    ]);

    res.json({
        msg: 'GET API Asignacion Cursos',
        listaAsignacion
    })
}

const postAsignacion = async (req = request, res = response) => {
    const {curso, usuario} = req.body;
    
    const totalAsignaciones = await Promise.all([
        Asignacion.countDocuments(usuario),
    ]);
    if(totalAsignaciones == 3) {
        res.status(201).json({
            msg: 'Solo puedes asignarte a 3 cursos'
        });
    }else {
        const data = {
            curso,
            usuario
        }

        const asignacion = new Asignacion(data);
        await asignacion.save();

        res.status(201).json({
            msg: 'POST API Asignacion Cursos',
            totalAsignaciones,
            asignacion
        })

    }
}

const putAsignacion = async(req = request, res = response) => {
    const {id} = req.params;
    const {curso, usuario} = req.body;

    const data = {
        curso,
        usuario
    }

    const asignacionEditada = await Asignacion.findOneAndReplace(id, data, {new: true});

    res.json({
        msg: 'PUT API Asignacion Cursos',
        asignacionEditada
    })
}

const deleteAsignacion = async(req = request, res = response) => {
    const {id} = req.params;

    const asignacionEliminada = await Asignacion.findOneAndDelete(id, {new: true});

    res.json({
        msg: 'DELETE API Asignacion Cursos',
        asignacionEliminada
    })
}

module.exports = {
    getAsignacion,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}