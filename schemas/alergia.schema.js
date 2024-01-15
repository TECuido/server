const Joi = require('joi')

const nombre = Joi.string();
const id = Joi.string();
const idUsuario = Joi.number().integer().min(0)

//Create Alergia -> Post -> (Nombre, idUsuario)
const createAlergiaSchema = Joi.object({
    nombre: nombre.required(),
    idUsuario: idUsuario.required()
})
// Get Alergia -> Get -> (ID)
const getAlergiaSchema = Joi.object({
    id: id.required()
})


module.exports = {createAlergiaSchema,getAlergiaSchema  }