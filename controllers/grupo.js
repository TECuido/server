const GrupoServices = require("../services/grupojs");

const service = new GrupoServices();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui se hace el getAllGrupos,getGrupo, deleteGrupo, getgruposGrupo , addGrupo y addGrupogrupo
 */
class GrupoController {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async getAllGrupos(req, res) {
    try {
      const grupos = await service.getAllGrupo();
      return res.status(200).json({ data: grupos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion que te da determinado grupo por id
   */
  async getGrupo(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const grupo = await service.getGrupo(id);
      if (grupo) {
        return res.status(200).json({ data: grupo });
      } else {
        return res.status(404).json({ message: "No se encontró el grupo" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupo. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre Nombre del grupo
   * @params {int} - idgrupo Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async addGrupo(req, res) {
    try {
      const grupo = await service.createGrupo(req.body);
      return res.status(200).json({ data: grupo });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el grupo. Err: ${err}` });
    }
  }
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion eliminar el grupo
   */
  async deleteGrupo(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      await service.deleteGrupo(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el grupo correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los grupos. Err: ${err}` });
    }
  }
}

module.exports = GrupoController;
