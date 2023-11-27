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
        .json({ message: `Error al obtener las recetas. Err: ${err}` });
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
      if (receta) {
        return res.status(200).json({ data: medicamento });
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
   * @params {int} - id Identificador de receta
   * @description Funcion que te da todas los medicamentos de una receta
   */
  async getMedicamentosReceta(req, res) {
    const idReceta = req.params.id;

    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(idPaciente))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
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

        const paciente = await usuarioService.getUsuario(req.body.idPaciente)

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
  
      
      const receta = await service.createReceta(req.body);

      return res.status(200).json({ data: receta });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }

}

module.exports = RecetaController;
