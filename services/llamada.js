const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado llamada y  eliminar determinado llamada.
 */
class LlamadaService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los llamadas
   */
  async getAllLlamadas() {
    const llamadas = await db.llamada.findMany();
    return llamadas;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del llamada
   * @description Funcion que da el llamada de un id
   */
  async getLlamada(id) {
    const llamada = await db.llamada.findUnique({
      where: {
        idLlamada: id,
      },
    });
    return llamada;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idLlamada Identificador de la llamada
   * @params {int} - idusuarioEmisor Identificador unico del usuario actual
   * @params {int} - idusuarioReceptor Identificador del usuario que vamos a mandar
   * @description Funcion que crea la relaciones de las llamadas
   */
  async addLlamada(idLlamada, idUsuarioEmisor, idUsuarioReceptor) {
    // Creamos el llamada
    return await db.llamada.create({
      data: {
        idLlamada: idLlamada,
        idUsuarioEmisor: Number(idUsuarioEmisor),
        idUsuarioReceptor: Number(idUsuarioReceptor),
      },
    });
  }
}

module.exports = LlamadaService;
