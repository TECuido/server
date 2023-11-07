const EmergenciaServices = require("../services/emergencia.js");
const GrupoService = require("../services/grupo.js");

const service = new EmergenciaServices();
const grupoService = new GrupoService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado emergencia, el login, crear el emergencia que mas adelante se va a modificar, actualizar el emergencia y eliminar determinado emergencia. Además, esta clase pasa todas las emergencias
 */
class EmergenciaController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los emergencias
   */
  async getAllEmergencias(req, res) {
    try {
      const emergencias = await service.getAllEmergencias();
      return res.status(200).json({ data: emergencias });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencias. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico la emergencia
   * @description Funcion que te da determinada emergencia atraves de un id
   */
  async getEmergencia(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const emergencia = await service.getEmergencia(id);
      if (emergencia) {
        return res.status(200).json({ data: emergencia });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la emergencia" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencia. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del emergencia
   * @description Funcion que te da todos los emergencias
   */
  async getEmergenciaPorEmisor(req, res) {
    const idEmisor = req.params.idEmisor;
    console.log(req.params);

    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(idEmisor))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const emergencia = await service.getEmergenciaPorEmisor(idEmisor);
      if (emergencia) {
        return res.status(200).json({ data: emergencia });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la emergencia" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencia. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - tipo es que una breve descripcion de la emergencia
   * @params {string} - descripcion es que esta pasando
   * @params {int} - idEmisor quien lo envia
   * @params {int} - idReceptor quien lo recibe
   * @description Funcion para darle registro a determinado emergencia
   */
  async addEmergenciaGrupo(req, res) {
    try {
      const emergencia = await service.createEmergencia(req.body);
      const idGrupo = req.body.idGrupo;
      const miembros = await grupoService.getUsuariosGrupo(idGrupo);

      for(let i = 0; i < miembros.length; i++){
        await service.addEmergenciaReceptor(emergencia.idEmergencia, miembros[i].miembroGrupo.idUsuario);
      }

      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }
}

module.exports = EmergenciaController;
