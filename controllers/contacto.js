const ContactoServices = require("../services/contacto.js");

const service = new ContactoServices();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado contacto y  eliminar determinado contacto.
 */
class ContactoController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los contactos
   */
  async getAllContactos(req, res) {
    try {
      const contactos = await service.getAllContactos();
      return res.status(200).json({ data: contactos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del contacto
   * @description Funcion que te da determinado contacto por id
   */
  async getContacto(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const contacto = await service.getContacto(id);
      if (contacto) {
        return res.status(200).json({ data: contacto });
      } else {
        return res.status(404).json({ message: "No se encontró el contacto" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contacto. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del contacto
   * @description Funcion eliminar el contacto
   */
  async deleteContacto(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      await service.deleteContacto(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el contacto correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }
}

module.exports = ContactoController;
