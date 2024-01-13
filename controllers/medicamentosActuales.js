const MedicamentosActualesService= require("../services/medicamentosActuales.js");
const service = new MedicamentosActualesService();

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado medicamentosActuales y crear medicamentosActuales
 */
class MedicamentosActualesController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los condicion medica
   */
  async getAllMedicamentosActuales(req, res) {
    try {
      const medicamentosActuales = await service.getAllMedicamentosActuales();
      return res.status(200).json({ data: medicamentosActuales });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los medicamentosActuales. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da determinado condicion medica por id
   */
  async getMedicamentosActualesUsuario(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const medicamentosActuales = await service.getMedicamentosActualesUsuario(id);
      if (medicamentosActuales) {
        return res.status(200).json({ data: medicamentosActuales });
      } else {
        return res.status(404).json({ message: "No se encontró el medicamentosActuales" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el medicamentosActuales. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 2.0.1
   * @license Gp
   * @params {int} - idmedicamentosActuales Identificador del medicamentosActuales que esta registrando el medicamentosActuales
   * @params {string} - nombre es el correo del medicamentosActuales a añadir en la relacion
   * @description  Funcion que crea las relaciones de medicamentosActuales
   */
  async addMedicamentosActuales(req, res) { 
    try {
      const medicamentosActualesCreado = await service.addMedicamentosActuales(
        req.body
      );
      res.status(200).json({data: medicamentosActualesCreado});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del medicamentosActuales
   * @params {string} - password Contraseña unica del medicamentosActuales
   * @params {string} - nombre Nombre del medicamentosActuales
   * @params {string} - correo Unico del medicamentosActuales
   * @description Funcion para actualizar un determinado medicamentosActuales
   */
    async updateMedicamentosActuales(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(parseInt(id))) {
          return res.status(500).json({ message: "El Id necesita ser entero" });
        }
        try {
          const medicamentosActuales = await service.updateMedicamentosActuales(id, req.body);
          return res.status(200).json({ data: medicamentosActuales });
        } catch (err) {
          return res
            .status(500)
            .json({ message: `Error al obtener los medicamentosActuales. Err: ${err}` });
        }
      }

        /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico de medicamento
   * @description Funcion eliminar el medicamento
   */
  async deleteMedicamentosActuales(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      await service.deleteMedicamentosActuales(id);
      return res
        .status(200)
        .json({ message: "Se ha eliminado el medicamento correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el medicamento. Err: ${err}` });
    }
  }
      
}

module.exports = MedicamentosActualesController;
