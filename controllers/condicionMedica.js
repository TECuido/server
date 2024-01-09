const CondicionMedicaService = require("../services/condicionMedica.js");
const service = new CondicionMedicaService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado condicionMedica y crear condicionMedica
 */
class CondicionMedicaController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los condicion medica
   */
  async getAllCondicionMedica(req, res) {
    try {
      const condicionMedica = await service.getAllCondicionMedica();
      return res.status(200).json({ data: condicionMedica });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los condicionMedicas. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado condicion medica por id
   */
  async getCondicionMedicaUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const condicionMedica = await service.getCondicionMedicaUsuario(id);
      if (condicionMedica) {
        return res.status(200).json({ data: condicionMedica });
      } else {
        return res.status(404).json({ message: "No se encontró el condicionMedica" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el condicionMedica. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador del usuario que esta registrando el condicionMedica
   * @params {string} - nombre es el correo del usuario a añadir en la relacion
   * @description  Funcion que crea las relaciones de condicionMedica
   */
  async addCondicionMedica(req, res) { 
    try {
      const condicionMedicaCreado = await service.addCondicionMedica(
        req.body
      );
      res.status(200).json({data: condicionMedicaCreado});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CondicionMedicaController;
