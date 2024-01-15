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

//Create Alergia -> Post -> Nombre, idUsuario
const createUsuarioDetallesSchema = Joi.object({
    numPoliza: numPoliza.required(),
    tipoSangre: tipoSangre.required(),
    contactoEmergencia: contactoEmergencia.required(),
    transfusionSanguinea: transfusionSanguinea.required(),
    donacionOrganos: donacionOrganos.required(),
    direccion: direccion.required(),
    edad: edad.required(),
    medicoTratante: medicoTratante.required()
})

const getUsuarioDetallesSchema = Joi.object({
    id: id.required()
})

const putUsuarioDetallesSchema = Joi.object({
    nombre: nombre,
    numPoliza: numPoliza,
    tipoSangre: tipoSangre,
    contactoEmergencia: contactoEmergencia,
    transfusionSanguinea: transfusionSanguinea,
    donacionOrganos: donacionOrganos,
    direccion: direccion,
    edad: edad,
    medicoTratante: medicoTratante
})

module.exports = {createUsuarioDetallesSchema, getUsuarioDetallesSchema, putUsuarioDetallesSchema }