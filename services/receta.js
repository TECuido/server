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
    return emergencias;
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
  async createReceta({
    idPaciente,
    idMedico,
    nombre,
    fecha,
  }) {
    const result = await db.receta.create({
      data: {
        idPaciente: idPaciente,
        nombre: nombre,
        idMedico: idMedico,
        fecha: fecha,
      },
    });
    return result;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id de la receta
   * @params {int} - id del medicamento
   * @params {string} - nombre del medicamento
   * @params {string} - dosis del medicamento
   * @params {string} - frecuencia del medicamento
   * @params {string} - duracion del medicamento
   * @description Funcion para agregar un medicamento a una receta
   */
  async addRecetaMedicamento ({
    idReceta,
    idMedicamento,
    nombre,
    dosis,
    frecuencia,
    duracion
  }) {
    const result = await db.medicamentoReceta.create({
      data: {
        idReceta: idReceta,
        idMedicamento: idMedicamento,
        nombre: nombre,
        dosis: dosis,
        frecuencia: frecuencia,
        duracion: duracion
      },
    });
    return result;
  }
  
}


module.exports = RecetaService;
