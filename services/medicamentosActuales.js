const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getall, get determinado condicion medica y add condicion medica
 */
class MedicamentosActualesSevice {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los medicamentosActuales
   */
  async getAllMedicamentosActuales() {
    const medicamentosActuales = await db.medicamentosActuales.findMany();
    return medicamentosActuales;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicamentosActuales
   * @description Funcion que una medicamentosActuales dado determinado id
   */
  async  getMedicamentosActualesUsuario(id) {
    const medicamentosActuales = await db.medicamentosActuales.findMany({
      where: {
        idUsuario: Number(id),
      },
    });
    return medicamentosActuales;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre 
   * @params {string} - motivo
   * @params {int} - idUsuario identificador unico de medicamento
   * @description Funcion que crea una medicamentosActuales
   */
  async addMedicamentosActuales({nombre,motivo,idUsuario}) {
    return await db.medicamentosActuales.create({
      data: {
        nombre: nombre,
        motivo: motivo,
        idUsuario: Number(idUsuario),
      },
    });
  }


   /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicamento
   * @params {string} -motivo porque toma la medicina
   * @params {string} - nombre Nombre del usuario
   * @params {int} - idUsuario identificador unico de medicamento
   * @description Funcion para actualizar un determinado usuario
   */
   async updateMedicamentosActuales(id, { nombre,motivo,idUsuario }) {
    const usuario = await db.medicamentosActuales.update({
      where: {   idMedicamentoActual: Number(id) },
      data: { nombre,motivo,idUsuario },
    });
    return usuario;
  }

}

module.exports = MedicamentosActualesSevice;
