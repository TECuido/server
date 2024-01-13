const AlergiasService = require("../services/alergias.js");
const service = new AlergiasService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado alergias y crear alergias
 */
class AlergiasController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los alergias
   */
  async getAllAlergias(req, res) {
    try {
      const alergias = await service.getAllAlergias();
      return res.status(200).json({ data: alergias });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los alergiass. Err: ${err}` });
    }
  }



  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado alergias por id
   */
  async getAlergiasUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const alergias = await service.getAlergiaUsuario(id);
      if (alergias) {
        return res.status(200).json({ data: alergias });
      } else {
        return res.status(404).json({ message: "No se encontró el alergias" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el alergias. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuario Identificador del usuario que esta registrando el alergias
   * @params {string} - nombre es el correo del usuario a añadir en la relacion
   * @description  Funcion que crea las relaciones de alergias
   */
  async addAlergias(req, res) { 
    try {
      const alergiasCreado = await service.addAlergia(
        req.body
      );

      res.status(200).json({data: alergiasCreado});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico de la alergia
   * @description Funcion eliminar la alergia
   */
  async deleteAlergia(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      await service.deleteAlergia(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado una alergia correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener la alergia. Err: ${err}` });
    }
  }

}

module.exports = AlergiasController;
