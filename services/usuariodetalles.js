const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra Rabago
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description clase de manejo de db de informacion extra */
class UsuarioDetalleService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra Rabago
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas la informacion extra
   */
  async getAllUsuarioDetalles() {
    const usuariodetalles = await db.usuarioDetalles.findMany();
    return usuariodetalles;
  }

  
/**
 * @author Bernardo de la Sierra Rabago
 * @version 1.0.1
 * @license Gp
 * @params {int} - id Identificador unico del emergencia
 * @description Funcion que da una receta por id
 */
async getUsuarioDetalles(id) {
  const usuariodetalles = await db.usuarioDetalles.findMany({
    where: {
      idUsuario: Number(id),
    },
    include: {
      contactoEmergencia: {
        select: {
          nombre: true,
          correo: true,
        },
      },
      Usuario: { // Include details from the Usuario model
        select: {
          nombre: true,
          // Add other fields from Usuario that you want to include
        },
      },
    },
  });
  return usuariodetalles;
}

  
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {int} - idContactoEmergencia Identificador unico del contacto de emergencia
   * @params {string} - tipoSangre es el tipo de sangre
   * @params {string} - transfusionSanguinea si acepta o no la transfusion sanguinea
   * @params {string} - donacionOrganos  si acepta o no dar o aceptar donacion de organos
   * @params {string} - direccion donde vive 
   * @params {string} - edad que edad tiene
   * @params {string} - medicoTratante que medico nos esta tratando
   * @description Funcion que crea los detalles de los usuarios
   */
  async addUsuarioDetalle(idUsuario, numPoliza,tipoSangre,idContactoEmergencia,transfusionSanguinea,donacionOrganos,direccion,edad,medicoTratante) {
    // Creamos el contacto
  
    return await db.usuarioDetalles.create({
      data: {
        idUsuario: Number(idUsuario),
        tipoSangre: tipoSangre,
        numPoliza: numPoliza,
        idContactoEmergencia: Number(idContactoEmergencia),
        transfusionSanguinea: transfusionSanguinea,
        donacionOrganos: donacionOrganos,
        direccion: direccion, 
        edad: edad,
        medicoTratante: medicoTratante
      },
    });
    
  }

    /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {int} - idContactoEmergencia Identificador unico del contacto de emergencia
   * @params {string} - tipoSangre es el tipo de sangre
   * @params {string} - transfusionSanguinea si acepta o no la transfusion sanguinea
   * @params {string} - donacionOrganos  si acepta o no dar o aceptar donacion de organos
   * @params {string} - direccion donde vive 
   * @params {string} - edad que edad tiene
   * @description Funcion que crea los detalles de los usuarios
   */
    async updateUsuarioDetalle(id, { numPoliza, idContactoEmergencia, tipoSangre, transfusionSanguinea, donacionOrganos, direccion, edad, medicoTratante }, nuevoId, nombre) {
      const usuario = await db.usuarioDetalles.updateMany({
        where: { idUsuario: Number(id) },
        data: {
          numPoliza,
          idContactoEmergencia: nuevoId,
          tipoSangre,
          transfusionSanguinea,
          donacionOrganos,
          direccion,
          edad,
          medicoTratante
        },
      });
    
      // Actualizar el nombre en la tabla Usuario
      const usuarioUpdate = await db.usuario.update({
        where: { idUsuario: Number(id) },
        data: {
          nombre
          // Puedes agregar otros campos de Usuario que deseas actualizar aquí
        },
      });
    
      return { usuario, usuarioUpdate };
    }
}

module.exports = UsuarioDetalleService;
