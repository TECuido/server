const Joi = require('joi')

const nombre = Joi.string();
const id = Joi.string()
const idUsuario = Joi.number().integer().min(0)

const createCondicionMedicaSchema = Joi.object({
    nombre: nombre.required(),
    idUsuario: idUsuario.required()
})

const getCondicionMedicaSchema = Joi.object({
    id: id.required()
})



module.exports = { createCondicionMedicaSchema, getCondicionMedicaSchema }