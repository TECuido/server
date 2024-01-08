const UsuarioService = require("../services/usuario.js");
const UsuarioDetallesService = require("../services/usuariodetalles");

const service = new UsuarioDetallesService();
const usuarioService = new UsuarioService();

/**
 * @author Bernardo de la Sierra Rábago
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos del api de UsuarioDetalles
 */
class UsuarioDetallesController {
  constructor() {}

  /**
   * @author  Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas la informacion extra
   */
  async getAllUsuarioDetalles(req, res) {
    try {
      const UsuarioDetalles =
        await service.getAllUsuarioDetalles();
      return res.status(200).json({ data: UsuarioDetalles });
    } catch (err) {
      return res.status(500).json({
        message: `Error al obtener la informacion extra. Err: ${err}`,
      });
    }
  }

  /**
   * @author  Bernardo de la Sierra Rábago
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador de la UsuarioDetalles
   * @description Funcion que da una emergencia por id
   */
  async getUsuarioDetalles(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const UsuarioDetalles =
        await service.getUsuarioDetalles(id);
      if (UsuarioDetalles) {
        return res.status(200).json({ data: UsuarioDetalles });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la UsuarioDetalles" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener UsuarioDetalles. Err: ${err}` });
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
  async addUsuarioDetalles(req, res) {
    const idUsuarioActual = req.params.id;
    const { numPoliza, contactoEmergencia } = req.body;

    try {
      //buscar si el usuario que se desea añadir como contacto existe
      const usuarioAgregado =
        await usuarioService.getUsuarioPorCorreo(contactoEmergencia);

      //si no existe el usuario lanzar un error
      if (!usuarioAgregado) {
        return res
          .status(400)
          .json({ message: "El correo no se encuentra registrado" });
      }

      //si el usuario que se agrega como contacto es el mismo usuario lanzar un error
      if (usuarioAgregado.idUsuario == idUsuarioActual) {
        return res.status(400).json({
          message:
            "No se puede agregar el mismo usuario como contato de emergencia",
        });
      }

      const usuarioActual = await usuarioService.getUsuario(idUsuarioActual);
      if (!usuarioActual) {
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }
      
      const UsuarioDetalles =
        await service.getUsuarioDetalles(idUsuarioActual);
      if (UsuarioDetalles) {
        return res
          .status(400)
          .json({ message: "El usuario ya registro un perfil de usuario" });
      }
      
      const usuariodetalleCreado = await service.addUsuarioDetalle(
        idUsuarioActual,
        numPoliza,
        contactoEmergencia
      );

      res.status(200).json(usuariodetalleCreado);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador del usuario que esta registrando el contacto
   * @description  Funcion que actualiza el perfil de usuario
   */
  async updateUsuarioDetalles(req, res) {
    const id = req.params.id;
    const {  contactoEmergencia } = req.body;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    console.log(contactoEmergencia);
    const usuarioAgregado = await usuarioService.getUsuarioPorCorreo(contactoEmergencia);
    console.log(usuarioAgregado);
    // si no existe el usuario lanzar un error
      if (!usuarioAgregado) {
        return res
          .status(400)
          .json({ message: "El correo no se encuentra registrado" });
      }

    try {
      const usuario = await service.updateUsuarioDetalle(id, req.body);
      return res.status(200).json({ data: usuario });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los datos. Err: ${err}` });
    }
  }

}

module.exports = UsuarioDetallesController;
