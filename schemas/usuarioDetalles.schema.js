const Joi = require('joi')

const nombre = Joi.string();
const id = Joi.string();
const numPoliza = Joi.string();
const tipoSangre = Joi.string();
const contactoEmergencia = Joi.string();
const transfusionSanguinea = Joi.string();
const donacionOrganos = Joi.string();
const direccion = Joi.string();
const edad = Joi.string();
const medicoTratante = Joi.string();

//Create UsuarioDetalles -> Post ->  (numPoliza,tipoSangre,contactoEmergencia,transfusionSanguinea,donacionOrganos,direccion
//edad,medicoTratante)
const createUsuarioDetallesSchema = Joi.object({
    numPoliza: numPoliza,
    tipoSangre: tipoSangre,
    contactoEmergencia: contactoEmergencia.required(),
    transfusionSanguinea: transfusionSanguinea,
    donacionOrganos: donacionOrganos,
    direccion: direccion,
    edad: edad,
    medicoTratante: medicoTratante
})

// GetUsuarioDetalles -> Get -> (id)
const getUsuarioDetallesSchema = Joi.object({
    id: id.required()
})
//PutUsuarioDetalles -> Put ->  (Nombre, numPoliza,tipoSangre,contactoEmergencia,transfusionSanguinea,donacionOrganos,direccion
//edad,medicoTratante)
const putUsuarioDetallesSchema = Joi.object({
    
    numPoliza: numPoliza,
    tipoSangre: tipoSangre,
    contactoEmergencia: contactoEmergencia,
    transfusionSanguinea: transfusionSanguinea,
    donacionOrganos: donacionOrganos,
    direccion: direccion,
    edad: edad,
    medicoTratante: medicoTratante,
    nombre: nombre
})

// getUsuarioDetallesPorContacto -> Get -> (id)
const getUsuarioDetallesPorContactoSchema = Joi.object({
    id: id.required()
})

module.exports = {createUsuarioDetallesSchema, getUsuarioDetallesSchema, putUsuarioDetallesSchema,getUsuarioDetallesPorContactoSchema }