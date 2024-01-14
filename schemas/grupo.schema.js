const Joi = require('joi')

const nombre = Joi.string();
const idCreador = Joi.number().integer();
const idMiembro = Joi.number().integer();
const idGrupo = Joi.number().integer();
const id = Joi.string()

const createGrupoSchema = Joi.object({
    nombre: nombre.required(),
    idCreador: idCreador.required()
})

const createMiembroSchema = Joi.object({
    idMiembro: idMiembro,
    idGrupo: idGrupo
})

const getGrupoSchema = Joi.object({
    id: id.required()
})

const updateGrupoSchema = Joi.object({
    nombre: nombre.required()
})

const deleteMiembroSchema = Joi.object({
    idGrupo: id.required(),
    idMiembro: id.required()
})

module.exports = { createGrupoSchema, createMiembroSchema, updateGrupoSchema, getGrupoSchema, deleteMiembroSchema}