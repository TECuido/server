const apn = require("apn");

const EmergenciaServices = require("../services/emergencia.js");
const GrupoService = require("../services/grupo.js");
const UsuarioService = require("../services/usuario.js");
const ContactoService = require("../services/contacto.js");
const {
  apnProvider,
  crearNotificacionEmergencia,
} = require("../utils/apnProv.js");

const service = new EmergenciaServices();
const grupoService = new GrupoService();
const usuarioService = new UsuarioService();
const contactoService = new ContactoService();
/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de getAll, get determinado emergencia, el login, crear el emergencia que mas adelante se va a modificar, actualizar el emergencia y eliminar determinado emergencia. Además, esta clase pasa todas las emergencias
 */
class EmergenciaController {
  constructor() {}

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los emergencias
   */
  async getAllEmergencias(req, res) {
    try {
      const emergencias = await service.getAllEmergencias();
      return res.status(200).json({ data: emergencias });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencias. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico la emergencia
   * @description Funcion que te da determinada emergencia atraves de un id
   */
  async getEmergencia(req, res) {
    const id = req.params.id;
    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const emergencia = await service.getEmergencia(id);
      if (emergencia) {
        return res.status(200).json({ data: emergencia });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la emergencia" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencia. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del emergencia
   * @description Funcion que te da todos los emergencias
   */
  async getEmergenciaPorEmisor(req, res) {
    const idEmisor = req.params.idEmisor;

    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(idEmisor))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const emergencia = await service.getEmergenciaPorEmisor(idEmisor);
      if (emergencia) {
        return res.status(200).json({ data: emergencia });
      } else {
        return res
          .status(404)
          .json({ message: "No se encontró la emergencia" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener los emergencia. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {int} - id Identificador unico del receptor
   * @description Funcion que da la ultima emergencia en las 24 horas pasadas
   */
  async getEmergenciaUltimas24Horas(req, res) {
    const idReceptor = req.params.id;

    // Verificamos que el id no sea un string
    if (!Number.isInteger(parseInt(idReceptor))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      const emergencia = await service.getEmergenciasUltimas24Horas(idReceptor);

      if (emergencia) {
        //obtener usuario emisor
        const usuario = await usuarioService.getUsuario(
          emergencia.emergencia.idEmisor
        );
        emergencia.emergencia.emisor = usuario.nombre;
        return res.status(200).json({ data: emergencia.emergencia });
      } else {
        return res
          .status(200)
          .json({ message: "No se encontraron emergencias" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener emergencias. Err: ${err}` });
    }
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {string} - tipo es que una breve descripcion de la emergencia
   * @params {string} - descripcion es que esta pasando
   * @params {int} - idEmisor quien lo envia
   * @params {int} - idReceptor quien lo recibe
   * @description Funcion para darle registro a determinado emergencia y agregarla a los miembros de un grupo
   */
  async addEmergenciaGrupo(req, res) {
    try {
      //crear emergencia
      const emergencia = await service.createEmergencia(req.body);
      const idGrupo = req.body.idGrupo;

      //agregar a los receptores
      const miembros = await grupoService.getUsuariosGrupo(idGrupo);

      for (let i = 0; i < miembros.length; i++) {
        await service.addEmergenciaReceptor(
          emergencia.idEmergencia,
          miembros[i].miembroGrupo.idUsuario
        );
      }

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      const miembrosTokens = await grupoService.getUsuariosGrupoTokens(idGrupo);
      miembrosTokens.forEach((miembro) => {
        if (miembro.miembroGrupo.token) {
          let token = miembro.miembroGrupo.token;
          apnProvider.send(note, token).then((result) => {
            if (result.failed && result.failed.length > 0) {
              console.log(
                `Error sending push notification: ${result.sent[0].device}`
              );
            } else if (result.sent && result.sent.length > 0) {
              console.log(
                `Push Notification sent to devide: ${result.sent[0].device}`
              );
            } else {
              console.log(`Unknown error while sending push notification`);
            }
          });
        }
      });

      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }

  /**
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @license Gp
   * @params {string} - tipo es que una breve descripcion de la emergencia
   * @params {string} - descripcion es que esta pasando
   * @params {int} - idEmisor quien lo envia
   * @params {int} - idReceptor quien lo recibe
   * @description Funcion para darle registro a determinado emergencia y agregarla a los miembros de un grupo
   */
  async addEmergenciaContactos(req, res) {
    try {
      //crear emergencia
      const emergencia = await service.createEmergencia(req.body);
      //agregar a los receptores
      const miembros = await contactoService.getContactosDeUsuario(
        emergencia.idEmisor
      );
      for (let i = 0; i < miembros.length; i++) {
        await service.addEmergenciaReceptor(
          emergencia.idEmergencia,
          miembros[i].usuarioAgregado.idUsuario
        );
      }

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      const miembrosTokens = await contactoService.getUsuariosContactoTokens(
        emergencia.idEmisor
      );
      miembrosTokens.forEach((miembro) => {
        if (miembro.usuarioAgregado.token) {
          let token = miembro.usuarioAgregado.token;
          apnProvider.send(note, token).then((result) => {
            if (result.failed && result.failed.length > 0) {
              console.log(
                `Error sending push notification: ${result.sent[0].device}`
              );
            } else if (result.sent && result.sent.length > 0) {
              console.log(
                `Push Notification sent to devide: ${result.sent[0].device}`
              );
            } else {
              console.log(`Unknown error while sending push notification`);
            }
          });
        }
      });

      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }
}

module.exports = EmergenciaController;
