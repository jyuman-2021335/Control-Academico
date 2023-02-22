//Importación
const {response, request} = require('express');

//Modelos
const Curso = require('../models/curso');

const getCursos = async(req = request, res = response) => {

    const listaCursos = await Promise.all([
        Curso.countDocuments(),
        Curso.find()
    ]);

    res.json({
        msg: 'GET API Cursos',
        listaCursos
    })

}

const postCurso = async(req = request, res = response) => {

    const {nombre, descripcion} = req.body;
    const cursoDB = new Curso({nombre, descripcion});

    await cursoDB.save();

    res.status(201).json({
        msg: 'POST API Cursos',
        cursoDB
    });

}

const putCurso = async(req = request, res = response) => {

    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const cursoEditado = await Curso.findOneAndReplace(id, resto);

    res.json({
        msg: 'PUT API Cursos',
        cursoEditado
    });

}

const deleteCurso = async(req = request, res = response) => {

    const {id} = req.params;

    const cursoEliminado = await Curso.findByIdAndRemove(id);

    res.json({
        msg: 'DELETE API Cursos',
        cursoEliminado
    });

}

module.exports = {
    getCursos,
    postCurso,
    putCurso,
    deleteCurso
}