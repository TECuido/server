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
    const usuariodetalles = await db.usuariodetalles.findMany();
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
    const usuariodetalles = await db.usuariodetalles.findUnique({
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
   * @params {int} - idUsuarioActual Identificador unico del usuario actual
   * @params {int} - usuario2 Identificador del usuario que vamos a mandar
   * @description Funcion que crea las relaciones de contactos
   */
  async addContacto(idUsuarioActual, idusuarioAgregado) {
    // Creamos el contacto
    return await db.contacto.create({
      data: {
        idAgrega: Number(idUsuarioActual),
        idAgregado: Number(idusuarioAgregado),
      },
    });
  }
}

module.exports = UsuarioDetalleService;
