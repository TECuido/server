const Joi = require('joi')

const nombre = Joi.string()
const idTipo = Joi.number().integer().min(0).max(2)
const correo = Joi.string().email();
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
    idTipo: idTipo.required()
})

const refreshTokenSchema = Joi.object({
    refreshToken: refreshToken.required()
})

module.exports = { loginSchema, registroSchema, refreshTokenSchema }