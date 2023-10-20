const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado contacto y  eliminar determinado contacto.
 */
class ContactoService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los contactos
   */
  async getAllContactos() {
    const contactos = await db.contacto.findMany();
    return contactos;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del contacto
   * @description Funcion que da el contacto de un id
   */
  async getContacto(id) {
    const contacto = await db.contacto.findUnique({
      where: {
        idContacto: Number(id),
      },
    });
    return contacto;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del contacto
   * @description Funcion que da todos los contactos de un usuario
   */
  async getContactosDeUsuario(idAgrega) {
    const contactos = await db.contacto.findMany({
      where: {
        idAgrega: Number(idAgrega)
      },
      select: {
        usuarioAgregado: {
          select:{
            nombre: true,
            correo: true
          }
        }
      }
    });
    return contactos;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id del usuario que agrega el contacto
   * @params {int} - id del usuario agregado como contacto
   * @description Funcion que da un contacto a partir de los usuarios involucrados
   */
  async getContactoPorUsuarios(idAgrega, idAgregado) {
    const contacto = await db.contacto.findUnique({
      where: {
        idAgrega: idAgrega,
        idAgregado: idAgregado
      },
    });
    return contacto;
  }


  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del contacto
   * @description Funcion eliminar el contacto
   */
  async deleteContacto(id) {
    await db.contacto.delete({
      where: { idContacto: Number(id) },
    });
  }

  /**
   * @author Bernardo de la Sierra    
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador unico del usuario actual
   * @params {int} - usuario2 Identificador del usuario que vamos a mandar
   * @description Funcion que crea las relaciones de contactos
   */
  async addContacto(idUsuarioActual, idusuarioAgregado) {
    // Creamos el contacto
    return await db.contacto.create({
      data: {
        idAgrega: idUsuarioActual,
        idAgregado: idusuarioAgregado,
      },
    });
  }
}

module.exports = ContactoService;
