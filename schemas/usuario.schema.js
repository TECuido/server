const Joi = require('joi')

const nombre = Joi.string();
const correo = Joi.string().email();
const password = Joi.string()
                .min(8)
                .max(64)
const token = Joi.string().min(32);
const idTipo = Joi.number().integer();

const id = Joi.string()

const createUsuarioSchema = Joi.object({
    nombre: nombre.required(),
    correo: correo.required(),
    password: password.required(),
    idTipo: idTipo.required()
})

const getUsuarioSchema = Joi.object({
    id: id.required()
})

const updateTokenSchema = Joi.object({
    token: token.required()
})

module.exports = { createUsuarioSchema, getUsuarioSchema, updateTokenSchema}