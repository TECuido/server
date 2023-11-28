const UsuarioService = require("../services/usuario.js")
const RecetaService = require("../services/receta.js");

const recetaService = new RecetaService();
const usuarioService = new UsuarioService();


/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos del api de recetas
 */
class RecetaController {
  constructor() {}

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todas las recetas
   */
  async getAllRecetas(req, res) {
    try {
      const recetas = await recetaService.getAllRecetas();
      return res.status(200).json({ data: recetas });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener las recetas. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador de la receta
   * @description Funcion que da una emergencia por id
   */
  async getReceta(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const receta = await recetaService.getReceta(id);
      if (receta) {
        return res.status(200).json({ data: receta });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la receta" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener receta. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del paciente
   * @description Funcion que te da todas las recetas de un paciente
   */
  async getRecetasPaciente(req, res) {
    
    try {

      const idPaciente = req.params.id;

      // Verificamos que el id no sea un string
      if (!Number.isInteger(parseInt(idPaciente))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const recetas = await recetaService.getRecetasPaciente(idPaciente)
      if (recetas) {
        return res.status(200).json({ data: recetas});
      } else {
        return res
          .status(404)
          .json({ message: "No se encontraron recetas" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener las recetas. Err: ${err}` });
    }
  }



  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @description Funcion para crear una receta
   */
  async createReceta(req, res) {
    try {

      const idPaciente = req.params.id;

      // Verificamos que el id no sea un string
      if (!Number.isInteger(parseInt(idPaciente))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const paciente = await usuarioService.getUsuario(idPaciente)

      //si no existe el usuario lanzar un error
      if (!paciente) {
        return res
          .status(400)
          .json({ message: "El paciente no se encuentra registrado" });
      }

      if(req.body.idMedico){
          const medico = await usuarioService.getUsuario(req.body.idMedico)
          if(!medico){
              return res
              .status(400)
              .json({ message: "El médico no se encuentra registrado" });
          }
      }
    
      const receta = await recetaService.createReceta(idPaciente, req.body);

      return res.status(200).json({ data: receta });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear la receta. Err: ${err}` });
    }
  }

}

module.exports = RecetaController;
