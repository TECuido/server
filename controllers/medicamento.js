const UsuarioService = require("../services/usuario.js")
const RecetaService = require("../services/receta.js");
const MedicamentoService = require("../services/medicamento.js");

const recetaService = new RecetaService();
const medicamentoService = new MedicamentoService();
const usuarioService = new UsuarioService();


/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos del api de medicamento
 */
class MedicamentoController {
  constructor() {}

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los medicamentos
   */
  async getAllMedicamentos(req, res) {
    try {
      const medicamentos = await medicamentoService.getAllMedicamentos();
      return res.status(200).json({ data: medicamentos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los medicamentos. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador del medicamento
   * @description Funcion que da un medicamento por id
   */
  async getMedicamento(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const medicamento = await medicamentoService.getMedicamento(id);
      if (medicamento) {
        return res.status(200).json({ data: medicamento });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró el medicamento" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener medicamento. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador de receta
   * @description Funcion que te da todas los medicamentos de una receta
   */
  async getMedicamentosReceta(req, res) {
   
    try {

      const idReceta = req.params.id;

      // Verificamos que el id no sea un string
      if (!Number.isInteger(parseInt(idReceta))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const meds = await medicamentoService.getRecetaMedicamentos(idReceta)
      if (meds) {
        return res.status(200).json({ data: meds})
        ;
      } else {
        return res
          .status(404)
          .json({ message: "No se encontraron medicamentos en la receta" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los medicamentos. Err: ${err}` });
    }
  }



  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @description Funcion para crear una receta
   */
  async addMedicamentoReceta(req, res) {
    
   

    try {

      const idReceta = req.params.id;

      if (!Number.isInteger(parseInt(idReceta))) {
        return res.status(500).json({ message: "El Id necesita ser entero" });
      }

      const receta = await recetaService.getReceta(idReceta)

      //si no existe la receta lanzar un error
      if (!receta) {
        return res
          .status(400)
          .json({ message: "La receta no existe" });
      }
  
      const medicamento = await medicamentoService.addRecetaMedicamento(idReceta, req.body)

      return res.status(200).json({ data: medicamento });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el medicamento. Err: ${err}` });
    }
  }

}

module.exports = MedicamentoController;
