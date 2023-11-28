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
    const medics = await db.medicamentoReceta.findMany();
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
    const med = await db.medicamentoReceta.findUnique({
      where: {
        idMedicamentoReceta: Number(id),
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
        idReceta: Number(id)
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
   * @params {int} - id de la receta
   * @params {int} - id del medicamento
   * @params {string} - nombre del medicamento
   * @params {string} - dosis del medicamento
   * @params {string} - frecuencia del medicamento
   * @params {string} - duracion del medicamento
   * @description Funcion para agregar un medicamento a una receta
   */
  async addRecetaMedicamento (
    idReceta, {
    nombre,
    dosis,
    frecuencia,
    duracion
  }) {
    const result = await db.medicamentoReceta.create({
      data: {
        idReceta: Number(idReceta),
        nombre: nombre,
        dosis: dosis,
        frecuencia: frecuencia,
        duracion: duracion
      },
    });
    return result;
  }
  

}


module.exports = MedicamentoService;
