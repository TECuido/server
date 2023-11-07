const { db } = require("../utils/db");

/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado emergencia, el login, crear el emergencia que mas adelante se va a modificar, actualizar el emergencia y eliminar determinado emergencia. Además, esta clase pasa todas las emergencias
 */
class EmergenciaService {
  constructor() {}
  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los emergencias
   */
  async getAllEmergencias() {
    const emergencias = await db.emergencia.findMany();
    return emergencias;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del emergencia
   * @description Funcion que da el emergencia de un id
   */
  async getEmergencia(id) {
    const emergencia = await db.emergencia.findUnique({
      where: {
        idEmergencia: Number(id),
      },
    });
    return emergencia;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id de quien lo envia
   * @description Funcion que da el emergencia de un id
   */
  async getEmergenciaPorEmisor(idEmisor) {
    const emergencia = await db.emergencia.findMany({
      where: {
        idEmisor: Number(idEmisor),
      },
    });

    return emergencia;
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - tipo es que una breve descripcion de la emergencia
   * @params {string} - descripcion es que esta pasando
   * @params {int} - idEmisor quien lo envia
   * @params {int} - idReceptor quien lo recibe
   * @description Funcion para darle registro a determinado emergencia
   */
  async createEmergencia({
    tipo,
    descripcion,
    idEmisor,
    longitud,
    latitud
  }) {
    const result = await db.emergencia.create({
      data: {
        tipo: tipo,
        descripcion: descripcion,
        idEmisor: idEmisor,
        longitud: longitud,
        latitud: latitud
      },
    });
    return result;
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id de la emergencia
   * @params {int} - id del receptor
   * @description Funcion para agregar un receptor de la emergencia
   */
  async addEmergenciaReceptor (
    idEmergencia,
    idReceptor
  ) {
    const result = await db.usuarioEmergencia.create({
      data: {
        idEmergencia: idEmergencia,
        idReceptor: idReceptor
      },
    });
    return result;
  }
  
}


module.exports = EmergenciaService;
