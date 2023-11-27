const { db } = require("../utils/db");

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description clase de manejo de db de medicamentos
 */
class MedicamentoService {
  constructor() {}
  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas los medicamentos
   */
  async getAllMedicamentos() {
    const medics = await db.medicamento.findMany();
    return medics;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico de medicamento
   * @description Funcion que da un medicamento por id
   */
  async getMedicamento(id) {
    const med = await db.medicamento.findUnique({
      where: {
        idMedicamento: Number(id),
      },
    });
    return med;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {string} - codigo del medicamento
   * @description Funcion que da un medicamento por su codigo
   */
  async getMedicamentoPorCodigo(codigo) {
    const med = await db.medicamento.findUnique({
      where: {
        codigo: codigo,
      },
    });
    return med;
  }


  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id de la receta
   * @description Funcion que da los medicamentos de una receta
   */
  async getRecetaMedicamentos(id) {
    const meds = await db.receta.findUnique({
      where: {
        idReceta: id
      },
      select: {
        medicamentoReceta: true
      }
    });

    return meds;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {string} - codigo del medicamento
   * @params {string} - uso
   * @params {string} - descripcion
   * @description Funcion para crear un medicamento
   */
  async createMedicamento({
    nombre,
    codigo,
    uso,
    descripcion
  }) {
    const result = await db.medicamento.create({
      data: {
        nombre: nombre,
        codigo: codigo,
        uso: uso,
        descripcion: descripcion
      },
    });
    return result;
  }


}


module.exports = MedicamentoService;
