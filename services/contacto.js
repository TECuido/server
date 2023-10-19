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
}

module.exports = ContactoService;
