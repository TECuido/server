const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado contacto y  eliminar determinado contacto.
 */
class GrupoService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async getAllGrupos() {
    const grupos = await db.grupo.findMany();
    return grupos;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion que da el grupo de un id
   */
  async getGrupo(id) {
    const grupo = await db.grupo.findUnique({
      where: {
        idGrupo: Number(id),
      },
    });
    return grupo;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre Nombre del grupo
   * @params {int} - idUsuario Unico del usuario
   * @description Funcion para darle registro a determinado grupo
   */
  async createGrupo({ nombre, idUsuario }) {
    const result = await db.grupo.create({
      data: {
        nombre: nombre,
        idUsuario: idUsuario,
      },
    });
    return result;
  }
}

module.exports = GrupoService;
