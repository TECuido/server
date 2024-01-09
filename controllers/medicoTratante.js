const MedicoTratanteService= require("../services/medicoTratante.js");
const service = new MedicoTratanteService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado medicoTratante y crear medicoTratante
 */
class MedicoTratanteController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los condicion medica
   */
  async getAllMedicoTratante(req, res) {
    try {
      const medicoTratante = await service.getAllMedicoTratante();
      return res.status(200).json({ data: medicoTratante });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los medicoTratante. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado condicion medica por id
   */
  async getMedicoTratanteUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const medicoTratante = await service.getMedicoTratanteUsuario(id);
      if (medicoTratante) {
        return res.status(200).json({ data: medicoTratante });
      } else {
        return res.status(404).json({ message: "No se encontró el medicoTratante" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el medicoTratante. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idmedicoTratante Identificador del medicoTratante que esta registrando el medicoTratante
   * @params {string} - nombre es el correo del medicoTratante a añadir en la relacion
   * @description  Funcion que crea las relaciones de medicoTratante
   */
  async addMedicoTratante(req, res) { 
    try {
      const medicoTratanteCreado = await service.addMedicoTratante(
        req.body
      );
      res.status(200).json({data: medicoTratanteCreado});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicoTratante
   * @params {string} - password Contraseña unica del medicoTratante
   * @params {string} - nombre Nombre del medicoTratante
   * @params {string} - correo Unico del medicoTratante
   * @description Funcion para actualizar un determinado medicoTratante
   */
    async updateMedicoTratante(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(parseInt(id))) {
          return res.status(500).json({ message: "El Id necesita ser entero" });
        }
        try {
          const medicoTratante = await service.updateMedicoTratante(id, req.body);
          return res.status(200).json({ data: medicoTratante });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los medicoTratante. Err: ${err}` });
        }
      }
      
}

module.exports = MedicoTratanteController;
