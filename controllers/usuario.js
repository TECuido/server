const UsuarioServices = require("../services/usuario.js");

const service = new UsuarioServices();

/**
 * @author Bernardo de la Sierra y Julio Meza
 * @version 2.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado usuario, el login, crear el usuario que mas adelante se va a modificar, actualizar el usuario y eliminar determinado usuario. Se añadio la relacion entre contactos
 */
class UsuarioController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los usuarios
   */
  async getAllUsuarios(req, res) {
    try {
      const usuarios = await service.getAllUsuarios();
      return res.status(200).json({ data: usuarios });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los usuarios. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion que te da determinado usuario por id
   */
  async getUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const usuario = await service.getUsuario(id);
      if (usuario) {
        return res.status(200).json({ data: usuario });
      } else {
        return res.status(404).json({ message: "No se encontró el usuario" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los usuario. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - password Contraseña unica del usuario
   * @params {string} - nombre Nombre del usuario
   * @params {string} - correo Unico del usuario
   * @description Funcion para darle registro a determinado usuario
   */
  async addUsuario(req, res) {
    try {
      const usuario = await service.createUsuario(req.body);
      return res.status(200).json({ data: usuario });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el usuario. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @params {string} - password Contraseña unica del usuario
   * @params {string} - nombre Nombre del usuario
   * @params {string} - correo Unico del usuario
   * @description Funcion para actualizar un determinado usuario
   */
  async updateUsuario(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const usuario = await service.updateUsuario(id, req.body);
      return res.status(200).json({ data: usuario });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los usuarios. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del usuario
   * @description Funcion eliminar el usuario
   */
  async deleteUsuario(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      await service.deleteUsuario(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el usuario correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los usuarios. Err: ${err}` });
    }
  }
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador del usuario que esta registrando el contacto
   * @params {string} - correo es el correo del usuario a añadir en la relacion
   * @description  Funcion que crea las relaciones de contactos
   */
  async addContacto(req, res) {
    const { idUsuarioActual, correo } = req.body;

    try {
      //buscar si el correo está registrado para evitar registrar de nuevo
      const usuario2 = await service.getUsuarioPorCorreo(correo);
      console.log(usuario2);
      if (!usuario2) {
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }
      const contactoCreado = await service.addContacto(
        idUsuarioActual,
        usuario2
      );
      console.log(contactoCreado);
      res.status(200).json(contactoCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
