//Importaciones
const {Router} = require('express');
const { check } = require('express-validator');

const { getCursos, postCurso, putCurso, deleteCurso, asignarAlumno } = require('../controllers/curso');
const { cursoExiste, existeCursoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestroRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', [
    validarJWT,
    esMaestroRole,
], getCursos);

router.post('/agregar', [
    validarJWT,
    esMaestroRole,
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('nombre').custom( cursoExiste ),
    validarCampos
], postCurso);

router.put('/editar/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre').custom( cursoExiste ),
    validarCampos
], putCurso);

router.delete('/eliminar/:id', [
    validarJWT,
    esMaestroRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], deleteCurso);


module.exports = router;