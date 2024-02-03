const Joi = require('joi')

const nombre = Joi.string();
const correo = Joi.string().email();
const telefono = Joi.string().regex(/^[0-9]{10}$/);
const id = Joi.string()
const esContactoEmergencia = Joi.boolean()

const createContactoSchema = Joi.object({
    nombre: nombre.required(),
    correo: correo,
    telefono: telefono.required(),
    esContactoEmergencia: esContactoEmergencia
})

const updateContactoSchema = Joi.object({
    nombre: nombre.required(),
    correo: correo,
    telefono: telefono.required()

})

const getContactoSchema = Joi.object({
    id: id.required()
})

const deleteContactoSchema = Joi.object({
    id: id.required(),
})

module.exports = { createContactoSchema, getContactoSchema, deleteContactoSchema , updateContactoSchema}