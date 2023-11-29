const Joi = require('joi')

const nombre = Joi.string();
const idReceta = Joi.number().integer();
const dosis = Joi.string();
const frecuencia = Joi.string();
const duracion = Joi.string();

const id = Joi.string()

const createMedicamentoSchema = Joi.object({
    nombre: nombre.required(),
    dosis: dosis.required(),
    frecuencia: frecuencia.required(),
    duracion: duracion.required()
})

const getMedicamentoSchema = Joi.object({
    id: id.required()
})

module.exports = { createMedicamentoSchema, getMedicamentoSchema }