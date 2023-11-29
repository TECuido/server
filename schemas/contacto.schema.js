const Joi = require('joi')

const correo = Joi.string();
const id = Joi.string()

const createContactoSchema = Joi.object({
    correo: correo.required()
})

const getContactoSchema = Joi.object({
    id: id.required()
})

const deleteContactoSchema = Joi.object({
    idAgrega: id.required(),
    idAgregado: id.required()
})

module.exports = { createContactoSchema, getContactoSchema, deleteContactoSchema }