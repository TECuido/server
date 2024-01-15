const Joi = require('joi')

const nombre = Joi.string();
const id = Joi.string()
const idUsuario = Joi.number().integer().min(0)

const createMedicamentosActualesSchema = Joi.object({
    nombre: nombre.required(),
    idUsuario: idUsuario.required()
})

const getMedicamentosActualesSchema = Joi.object({
    id: id.required()
})


module.exports = { createMedicamentosActualesSchema, getMedicamentosActualesSchema }