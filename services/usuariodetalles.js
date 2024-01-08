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
    const usuariodetalles = await db.usuarioDetalles.findUnique({
      where: {
        idUsuarioDetalle: Number(id),
      },
    });
    return usuariodetalles;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuarioDetalle Identificador unico del usuario
   * @params {int} - numPoliza Numero de poliza del usuario
   * @params {string} - contactoEmergencia correo del contacto de Emergencia
   * @description Funcion que crea las relaciones de contactos
   */
  async addUsuarioDetalle(idUsuarioDetalle, numPoliza, contactoEmergencia) {
    // Creamos el contacto
    return await db.usuarioDetalles.create({
      data: {
        idUsuarioDetalle: Number(idUsuarioDetalle),
        numPoliza: Number(numPoliza),
        contactoEmergencia: contactoEmergencia,
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
        where: { idUsuarioDetalle: Number(id) },
        data: { numPoliza, contactoEmergencia  },
      });
      return usuario;
    }

}

module.exports = UsuarioDetalleService;
