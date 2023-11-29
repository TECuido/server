const UsuarioService = require("../services/usuario.js");
const UsuarioDetallesService = require("../services/usuariodetalles.js");

const UsuarioDetallesService = new UsuarioDetallesService();
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
        await UsuarioDetallesService.getAllUsuarioDetalles();
      return res.status(200).json({ data: UsuarioDetalles });
    } catch (err) {
      return res.status(500).json({
        message: `Error al obtener la informacion extra++++. Err: ${err}`,
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
        await UsuarioDetallesService.getUsuarioDetalles(id);
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
}

module.exports = UsuarioDetallesController;
