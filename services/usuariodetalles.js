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
  const usuarioDetalle = await db.usuarioDetalles.findUnique({
    where: {
      idUsuarioPerfil: Number(id),
    },
  });
  return usuarioDetalle;
}


  
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuarioPerfil Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {int} - idContactoEmergencia Identificador unico del contacto de emergencia
   * @params {string} - tipoSangre es el tipo de sangre
   * @params {string} - transfusionSanguinea si acepta o no la transfusion sanguinea
   * @params {string} - donacionOrganos  si acepta o no dar o aceptar donacion de organos
   * @params {string} - direccion donde vive 
   * @params {string} - edad que edad tiene
   * @description Funcion que crea los detalles de los usuarios
   */
  async addUsuarioDetalle(idUsuarioPerfil, numPoliza,tipoSangre,idContactoEmergencia,transfusionSanguinea,donacionOrganos,direccion,edad) {
    // Creamos el contacto
  
    return await db.usuarioDetalles.create({
      data: {
        idUsuarioPerfil: Number(idUsuarioPerfil),
        tipoSangre: tipoSangre,
        numPoliza: Number(numPoliza),
        idContactoEmergencia: Number(idContactoEmergencia),
        transfusionSanguinea: transfusionSanguinea,
        donacionOrganos: donacionOrganos,
        direccion: direccion, 
        edad: edad,
      },
    });
    
  }

    /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @params {string} - password Contraseña unica del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {string} - contactoEmergencia correo del contacto de Emergencia
   * @description Funcion para actualizar un determinado usuario
   */
    async updateUsuarioDetalle(id, { numPoliza, contactoEmergencia }) {
      const usuario = await db.usuarioDetalles.update({
        where: { idUsuarioPerfil: Number(id) },
        data: { numPoliza, contactoEmergencia  },
      });
      return usuario;
    }

}

module.exports = UsuarioDetalleService;
