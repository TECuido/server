const Joi = require('joi')

const nombre = Joi.string();
const id = Joi.string()
const idUsuario = Joi.number().integer().min(0)
// Post createMedicamentosActualesSchema -> Post -> (nombre, idUsuario)

const createMedicamentosActualesSchema = Joi.object({
    nombre: nombre.required(),
    idUsuario: idUsuario.required()
})
// Get getMedicamentosActualesSchema -> Get -> (ID)

const getMedicamentosActualesSchema = Joi.object({
    id: id.required()
})


module.exports = { createMedicamentosActualesSchema, getMedicamentosActualesSchema }