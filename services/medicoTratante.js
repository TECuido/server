const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getall, get determinado condicion medica y add condicion medica
 */
class MedicoTratanteService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los medicoTratante
   */
  async getAllMedicoTratante() {
    const medicoTratante = await db.medicoTratante.findMany();
    return medicoTratante;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicoTratante
   * @description Funcion que una medicoTratante dado determinado id
   */
  async  getMedicoTratanteUsuario(id) {
    const medicoTratante = await db.medicoTratante.findMany({
      where: {
        idUsuario: Number(id),
      },
    });
    return medicoTratante;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre 
   * @params {string} - especialidad
   * @params {int} - idUsuario identificador unico de medicamento
   * @description Funcion que crea una medicoTratante
   */
  async addMedicoTratante({nombre,especialidad,idUsuario}) {
    return await db.medicoTratante.create({
      data: {
        nombre: nombre,
        especialidad: especialidad,
        idUsuario: Number(idUsuario),
      },
    });
  }


   /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicamento
   * @params {string} -especialidad porque toma la medicina
   * @params {string} - nombre Nombre del usuario
   * @params {int} - idUsuario identificador unico de medicamento
   * @description Funcion para actualizar un determinado usuario
   */
   async updateMedicoTratante(id, { nombre,especialidad,idUsuario }) {
    const usuario = await db.medicoTratante.update({
      where: {   idMedicoTratante: Number(id) },
      data: { nombre,especialidad,idUsuario },
    });
    return usuario;
  }

}

module.exports = MedicoTratanteService;
