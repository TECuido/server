const UsuarioServices = require("../services/usuario.js");

const service = new UsuarioServices();


class UsaurioController {
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
      return res.status(200).json({ usuarios });
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
   * @description Funcion que te da todos los usuarios
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
        return res.status(200).json({ usuario });
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
      return res.status(200).json({ usuario });
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
      return res.status(200).json({ usuario });
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
}

module.exports = UsaurioController;
