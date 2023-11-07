const LlamadaServices = require("../services/llamada.js");

const service = new LlamadaServices();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params {int} tamañon del codigo a generar
 * @description Función para generar un código único de 5 letras
 */
function generateUniqueCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
        return res.status(404).json({ message: "No se encontró el llamada" });
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
    const { idusuarioReceptor } = req.body;

    try {
      //si no existe el usuario lanzar un error
      if (!idusuarioReceptor) {
        return res
          .status(400)
          .json({ message: "El usuario no se encuentra registrado" });
      }

      //si el usuario que se agrega como llamada es el mismo usuario lanzar un error

      if (idusuarioReceptor == idUsuarioActual) {
        return res
          .stauts(400)
          .json({ message: "No se puede agregar el mismo usuario" });
      }
      // Generar el idLlamada
      let idLlamada = generateUniqueCode(8);
      console.log(idLlamada);

      let llamadaRepetida = await service.getLlamada(idLlamada);
      while (llamadaRepetida) {
        idLlamada = generateUniqueCode(8);
        llamadaRepetida = await service.getLlamada(idLlamada);
      }
      console.log(llamadaRepetida);
      //crear el llamada
      const llamadaCreada = await service.addLlamada(
        idLlamada,
        idUsuarioActual,
        idusuarioReceptor
      );

      res.status(200).json(llamadaCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = LlamadaController;
