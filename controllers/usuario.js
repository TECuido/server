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
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async addNotificationToken(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const usuario = await service.addNotificationToken(id, req.body.token);
      return res.status(200).json({ data: { idUsuario: usuario.idUsuario, token: usuario.token } });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al enviar la notificacion. Err: ${err}` });
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
 
}

module.exports = UsuarioController;
