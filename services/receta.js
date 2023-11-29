const { db } = require("../utils/db");

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description clase de manejo de db de recetas
 */
class RecetaService {
  constructor() {}
  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas las recetas
   */
  async getAllRecetas() {
    const recetas = await db.receta.findMany();
    return recetas;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del emergencia
   * @description Funcion que da una receta por id
   */
  async getReceta(id) {
    const receta = await db.receta.findUnique({
      where: {
        idReceta: Number(id),
      },
    });
    return receta;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id de quien lo envia
   * @description Funcion que da las recetas de un usuario
   */
  async getRecetasPaciente(idUsuario) {
    const recetas = await db.receta.findMany({
      where: {
        idPaciente: Number(idUsuario),
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return recetas;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id del paciente
   * @params {int} - id del medico
   * @params {int} - nombre de la receta
   * @params {int} - fecha de emision
   * @description Funcion para crear una receta
   */
  async createReceta(
    idPaciente, {
    idMedico,
    nombre,
    fecha,
  }) {
    const result = await db.receta.create({
      data: {
        idPaciente: Number(idPaciente),
        nombre: nombre,
        idMedico: idMedico,
        fecha: new Date(fecha),
      },
    });
    return result;
  }

  
}


module.exports = RecetaService;
