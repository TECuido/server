const LlamadaServices = require("../services/llamada.js");
const UsuarioServices = require("../services/usuario.js");

const service = new LlamadaServices();
const usuarioService = new UsuarioServices();


/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params {int} tamañon del codigo a generar
 * @description Función para generar un código único de n letras
 */
function generateUniqueCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let code = "";

  while (code.length < length) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado llamada y  eliminar determinado llamada.
 */
class LlamadaController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los llamadas
   */
  async getAllLlamadas(req, res) {
    try {
      const llamadas = await service.getAllLlamadas();
      return res.status(200).json({ data: llamadas });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los llamadas. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los llamadas de un usuario
   */
  async getAllLlamadasUsuario(req, res) {
    try {
      const id = req.params.id;

      const llamadas = await service.getLlamadasDeUsuario(id);
      return res.status(200).json({ data: llamadas });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los llamadas. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado llamada por id
   */
  async getLlamada(req, res) {
    const id = req.params.id;
    try {
      const llamada = await service.getLlamada(id);
      if (llamada) {
        return res.status(200).json({ data: llamada });
      } else {
        return res.status(404).json({ message: "No se encontró la llamada" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el llamada. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idUsuarioActual Identificador del usuario que esta registrando el llamada
   * @params {string} - correo es el correo del usuario a añadir en la relacion
   * @description  Funcion que crea las relaciones de llamadas, en la segunda version se agrego el llamada
   */
  async addLlamada(req, res) {
    const idUsuarioActual = req.params.id;
    const { idUsuarioReceptor } = req.body;

    try {
      //si no existe el usuario lanzar un error
      const usuarioReceptor = await usuarioService.getUsuario(idUsuarioReceptor);
      const usuarioEmisor = await usuarioService.getUsuario(idUsuarioActual);

      if (!usuarioReceptor || !usuarioEmisor) {
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }

      //si el usuario que se agrega como llamada es el mismo usuario lanzar un error
      if (idUsuarioReceptor == idUsuarioActual) {
        return res
          .stauts(400)
          .json({ message: "No se puede agregar el mismo usuario" });
      }
      // Generar el idLlamada
      let idLlamada = generateUniqueCode(8);

      let llamadaRepetida = await service.getLlamada(idLlamada);
      while (llamadaRepetida) {
        idLlamada = generateUniqueCode(8);
        llamadaRepetida = await service.getLlamada(idLlamada);
      }

      //crear el llamada
      const llamadaCreada = await service.addLlamada(
        idLlamada,
        idUsuarioActual,
        idUsuarioReceptor
      );

      res.status(200).json({data: llamadaCreada});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion para conectar un usuario a una llamada existente
   */
  async generateToken(req, res) {
    const idUsuario = req.params.id;

    try {

      const usuario = await usuarioService.getUsuario(idUsuario);

      if (!usuario) {
        return res.status(404).json({ message: "Error al generar el token" });
      }

      return res.status(200).json({ data: {token: "1"} });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al generar el token. Err: ${err}` });
    }
  }
}

module.exports = LlamadaController;
