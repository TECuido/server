const Joi = require('joi')

const nombre = Joi.string()
const idTipo = Joi.number().integer().min(0).max(2)
const correo = Joi.string().email();
const telefono = Joi.string().regex(/^[0-9]{10}$/);;
const password = Joi.string();
const refreshToken = Joi.string();

const loginSchema = Joi.object({
    correo: correo.required(),
    password: password.required()
})

const registroSchema = Joi.object({
    nombre: nombre.required(),
    correo: correo.required(),
    password: password.min(8).max(64).required(),
    telefono: telefono.required(),
    idTipo: idTipo.required()
})

const refreshTokenSchema = Joi.object({
    refreshToken: refreshToken.required()
})

module.exports = { loginSchema, registroSchema, refreshTokenSchema }