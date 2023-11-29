const Joi = require('joi')

const nombre = Joi.string();
const idMedico = Joi.number().integer();
const fecha = Joi.date();
const id = Joi.string()

const createRecetaSchema = Joi.object({
    nombre: nombre.required(),
    idMedico: idMedico,
    fecha: fecha.required()
})

const getRecetaSchema = Joi.object({
    id: id.required()
})

module.exports = { createRecetaSchema, getRecetaSchema }