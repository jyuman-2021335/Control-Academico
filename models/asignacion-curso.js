const {Schema, model} = require('mongoose');

const AsignacionSchema = new Schema({
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

module.exports = model('Asignacion', AsignacionSchema);