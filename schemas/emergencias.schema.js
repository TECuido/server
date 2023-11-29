const Joi = require('joi')

const id = Joi.string()
const tipo = Joi.string();
const descripcion = Joi.string()
const idEmisor = Joi.number().integer()
const idGrupo = Joi.number().integer()
const latitud = Joi.number()
const longitud = Joi.number()

const createEmergenciaGrupoSchema = Joi.object({
    tipo: tipo.required(),
    descripcion: descripcion,
    idEmisor: idEmisor.required(),
    idGrupo: idGrupo.required(),
    latitud: latitud,
    longitud: longitud
})

const createEmergenciaContactosSchema = Joi.object({
    tipo: tipo.required(),
    descripcion: descripcion,
    idEmisor: idEmisor.required(),
    latitud: latitud,
    longitud: longitud
})

const getEmergenciaSchema = Joi.object({
    id: id.required()
})

const getEmergenciasEmisorSchema = Joi.object({
    idEmisor: id.required()
})


module.exports = { createEmergenciaGrupoSchema, getEmergenciaSchema, getEmergenciasEmisorSchema, createEmergenciaContactosSchema }