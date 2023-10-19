const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado grupo y  eliminar determinado grupo.
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
   * @params {int} -  idUsuario  Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async createGrupo({ nombre, idUsuario }) {
    const result = await db.grupo.create({
      data: {
        nombre: nombre,
        idCreador: idUsuario,
      },
    });
    return result;
  }
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del grupo
   * @description Funcion eliminar el grupo
   */
  async deleteGrupo(id) {
    await db.grupo.delete({
      where: { idGrupo: Number(id) },
    });
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} -  idUsuarioAgregado Usuario al que se va agregar al grupo
   * @params {int} - idGrupo Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async addUsuarioGrupo(idUsuario, idGrupo) {
    const result = await db.usuarioGrupo.create({
      data: {
        idMiembro: idUsuario,
        idGrupo: idGrupo
      },
    });
    return result;
  }

  /**
   * @author Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params {int} - idGrupo es el id del grupo
   * @description Funcion que regresa el usuario que tiene un determinado correo
   */
  async getUsuariosGrupo(idGrupo) {
    const usuariosGrupo = await db.usuarioGrupo.findMany({
      where: {
        idGrupo: Number(idGrupo)
      },
      
      select: {
        miembroGrupo: {
          select: {
            idUsuario: true,
            nombre: true,
            correo: true
          }
        }
      }
    });
    return usuariosGrupo;
  }
}

module.exports = GrupoService;
