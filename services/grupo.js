const { db } = require("../utils/db");

/**
 * @author Julio Meza
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
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id del usuario que se agrega al grupo
   * @params {int} - id del grupo
   * @description Funcion que regresa si ya esta una entrada con el usuario y el grupo
   */
  async getGrupoMiembro(idMiembro, idGrupo) {
    const miembro = await  db.usuarioGrupo.findFirst({
      where: {
        AND: [
          { idMiembro: Number(idMiembro)  },
          { idGrupo: Number(idGrupo) }
        ]
      }
    });
    return miembro;
  }


  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - nombre Nombre del grupo
   * @params {int} -  idUsuario  Unico del grupo
   * @description Funcion para darle registro a determinado grupo
   */
  async createGrupo({ nombre, idCreador }) {
    const result = await db.grupo.create({
      data: {
        nombre: nombre,
        idCreador: idCreador,
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
  async addUsuarioGrupo(idMiembro, idGrupo) {
    const result = await db.usuarioGrupo.create({
      data: {
        idMiembro: Number(idMiembro),
        idGrupo: Number(idGrupo)
      },
    });
    return result;
  }

  /**
   * @author Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params {int} - idGrupo es el id del grupo
   * @description Funcion que regresa los usuarios de su grupo
   */
  async getContactosGrupo(idGrupo) {
    const contactosGrupo = await db.usuarioGrupo.findMany({
      where: {
        idGrupo: Number(idGrupo)
      },
      
      select: {
        miembroGrupo: {
          select: {
            idContacto: true,
            nombre: true,
            correo: true,
            telefono: true,
            usuarioAgregado: {
              select: {
                idUsuario: true
              }
            }
          }
        }
      }
    });
    return contactosGrupo;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - idGrupo es el id del grupo
   * @description Funcion que regresa los usuarios de un grupo con sus tokens de notificacion
   */
  async getUsuariosGrupoTokens(idGrupo) {
    const usuariosGrupo = await db.usuarioGrupo.findMany({
      where: {
        idGrupo: Number(idGrupo)
      },
      
      select: {
        miembroGrupo: {
          select: {
            usuarioAgregado: {
              select: {
                token: true 
              }
            }
          }
        }
      }
    });
    return usuariosGrupo;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuario es el id del usuario
   * @description Funcion que regresa los grupos que ha creado un usuario
   */
  async getGruposUsuario(idUsuario) {
    const grupos = await db.grupo.findMany({
      where: {
        idCreador: Number(idUsuario)
      }, 
      select: {
        idGrupo: true,
        nombre: true,
      }
    });
    return grupos;
  }

  /**
   * @author Irving Agramón y Rubén Tandon 
   * @version 1.0.1
   * @license Gp
   * @params {int} -  idContactoGrupo Identificador único del miembro en UsuarioGrupo
   * @description Funcion para eliminar un usuario de un grupo
   */

  async deleteMiembro(idContactoGrupo){
    await db.usuarioGrupo.delete({
      where: {
        idContactoGrupo : Number(idContactoGrupo)
      },
    })
  }

  /**
   * @author Irving Agramón y Rubén Tandon 
   * @version 1.0.1
   * @license Gp
   * @params {int} -  idGrupo Grupo al que se va a eliminar el miembro
   * @params {int} - idMiembro Identificador Unico del miembro
   * @description Funcion que nos va a permitir cambiar el nombre de un grupo
   */

  async updateGrupoName(id, {nombre}){
    const grupo = await db.grupo.update({
      where: {idGrupo: Number(id)},
      data: {nombre},
    });
    return grupo;
  }
}

module.exports = GrupoService;
