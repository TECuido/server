const ContactoServices = require("../services/contacto.js");
const UsuarioServices = require("../services/usuario.js");

const service = new ContactoServices();

const usuarioService = new UsuarioServices();

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
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los contactos de un usuario
   */
  async getAllContactosUsuario(req, res) {
    try {
      const id = req.params.id;

      if (!Number.isInteger(parseInt(id))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const contactos = await service.getContactosDeUsuario(id);
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
   * @params Sin parametros
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
        .json({ message: `Error al obtener el contacto. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idAgrega Identificador del usuario que agrega
   *  @params {int} - idAgregado Identificador del usuario que agrega
   * @description Funcion eliminar el contacto
   */
  async deleteContacto(req, res) {
    const { idAgrega, idAgregado } = req.params;
    if (!Number.isInteger(parseInt(idAgrega))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    if (!Number.isInteger(parseInt(idAgregado))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }

    try {
      const contacto = await service.getContactoPorUsuarios(
        idAgrega,
        idAgregado
      );
      if (!contacto) {
        return res.status(404).json({ message: "No se encontró el contacto" });
      }

      await service.deleteContacto(contacto.idContacto);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el contacto correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los contactos. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador del usuario que esta registrando el contacto
   * @params {string} - correo es el correo del usuario a añadir en la relacion
   * @description  Funcion que crea las relaciones de contactos, en la segunda version se agrego el contacto
   */
  async addContacto(req, res) {
    const idUsuarioActual = req.params.id;
    const { correo } = req.body;

    try {
      //buscar si el usuario que se desea añadir como contacto existe
      const usuarioAgregado = await usuarioService.getUsuarioPorCorreo(correo);

      //si no existe el usuario lanzar un error
      if (!usuarioAgregado) {
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }

      //si el usuario que se agrega como contacto es el mismo usuario lanzar un error
      if (usuarioAgregado.idUsuario == idUsuarioActual) {
        return res
          .stauts(400)
          .json({ message: "No se puede agregar el mismo usuario" });
      }

      const usuarioActual = await usuarioService.getUsuario(idUsuarioActual);
      if(!usuarioActual){
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }

      if(usuarioActual.idTipo == 2 && usuarioAgregado.idTipo == 2){
        return res
        .status(400)
        .json({ message: "Solamente puedes agregar pacientes desde un perfil de médico" });
      }

      //buscar que no se haya registrado ya el contacto
      const contacto = await service.getContactoPorUsuarios(
        idUsuarioActual,
        usuarioAgregado.idUsuario
      );

      if (contacto) {
        return res
          .status(400)
          .json({ message: "El contacto ya se ha registrado" });
      }

      //crear el contacto
      const contactoCreado = await service.addContacto(
        idUsuarioActual,
        usuarioAgregado.idUsuario
      );

      res.status(200).json(contactoCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContactoController;
