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
        idAgrega: Number(idAgrega),
      },
      select: {
        idContacto: true,
        nombre: true,
        correo:true,
        telefono: true,
        usuarioAgregado: {
          select: {
            idUsuario: true
          }
        }
      },
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
    const contacto = await db.contacto.findFirst({
      where: {
        AND: [
          { idAgrega: Number(idAgrega) },
          { idAgregado: Number(idAgregado) },
        ],
      },
    });
    return contacto;
  }

   /**
   * @author Julio Emmanuel Meza Rangel
   * @version 1.0.1
   * @license Gp
   * @params {string} - correo del usuario
   * @description Funcion que regresa el usuario que tiene un determinado correo
   */
   async getContactoPorNombre(nombre) {
    const contacto = await db.contacto.findFirst({
      where: {
        nombre: nombre
      },
    });
    return contacto;
  }


  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id del usuario que agrega el contacto
   * @params {int} - id del usuario agregado como contacto
   * @description Funcion que da un contacto a partir de los usuarios involucrados
   */
  async getContactoPorTelefono(idAgrega, telefono) {
    const contacto = await db.contacto.findFirst({
      where: {
        idAgrega: Number(idAgrega),
        telefono
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
      where: { 
        idContacto: Number(id) 
      },
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
  async addContacto(
    idUsuarioActual, 
    {
      nombre, 
      correo, 
      telefono, 
    }, 
    idUsuarioAgregado = null
  ) {
    // Creamos el contacto
    return await db.contacto.create({
      data: {
        idAgrega: Number(idUsuarioActual),
        nombre,
        correo,
        telefono,
        idAgregado: idUsuarioAgregado ? Number(idUsuarioAgregado) : idUsuarioAgregado
      },
    });
  }

  /**
   * @author Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params {int} - idGrupo es el id del grupo
   * @description Funcion que regresa los usuarios de un grupo con sus tokens de notificacion
   */
  async getUsuariosContactoTokens(idAgrega) {
    const usuariosGrupo = await db.contacto.findMany({
      where: {
        idAgrega: Number(idAgrega),
      },

      select: {
        usuarioAgregado: {
          select: {
            idUsuario: true,
            token: true,
          },
        },
      },
    });
    return usuariosGrupo;
  }

  async updateUsuarioContactos(telefono, idUsuario){
    const contactos = await db.contacto.updateMany({
      where: {
        telefono: telefono
      },
      data: {
        idAgregado: idUsuario
      }
    })
    return contactos;
  }

  async updateContacto(id, { nombre, correo, telefono }) {
    correo = correo.toLowerCase()
    const contacto = await db.contacto.update({
      where: { idContacto: Number(id) },
      data: { nombre, correo, telefono },
    });
    return contacto;
  }

}

module.exports = ContactoService;

