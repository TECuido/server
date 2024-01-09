const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getall, get determinado alergia y update alergias
 */
class AlergiaService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los alergias
   */
  async getAllAlergias() {
    const Alergias = await db.alergias.findMany();
    return Alergias;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del Alergia
   * @description Funcion que una alergia dado determinado id
   */
  async getAlergiaUsuario(id) {
    const alergia = await db.alergias.findMany({
      where: {
        idUsuario: Number(id),
      },
    });
    return alergia;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre 
   * @params {int} - idUsuario identificador unico de alergia
   * @description Funcion que crea una alergia
   */
  async addAlergia({nombre,idUsuario}) {
    return await db.alergias.create({
      data: {
        nombre: nombre,
        idUsuario: Number(idUsuario),
      },
    });
  }

}

module.exports = AlergiaService;
