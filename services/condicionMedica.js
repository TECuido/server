const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getall, get determinado condicion medica y add condicion medica
 */
class CondicionMedicaSevice {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los condicionMedicas
   */
  async getAllCondicionMedica() {
    const condicionMedicas = await db.condicionMedica.findMany();
    return condicionMedicas;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del condicionMedica
   * @description Funcion que una condicionMedica dado determinado id
   */
  async getCondicionMedicaUsuario(id) {
    const condicionMedica = await db.condicionMedica.findMany({
      where: {
        idUsuario: Number(id),
      },
    });
    return condicionMedica;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre 
   * @description Funcion que crea una condicionMedica
   */
  async addCondicionMedica({nombre,idUsuario}) {
    return await db.condicionMedicas.create({
      data: {
        nombre: nombre,
        idUsuario: Number(idUsuario),
      },
    });
  }

}

module.exports = CondicionMedicaSevice;
