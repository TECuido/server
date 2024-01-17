const apn = require("apn");

const EmergenciaServices = require("../services/emergencia.js");
const GrupoService = require("../services/grupo.js");
const UsuarioService = require("../services/usuario.js");
const ContactoService = require("../services/contacto.js");
const {
  apnProvider,
  crearNotificacionEmergencia,
} = require("../utils/apnProv.js");
const { setDifference } = require("../utils/sets.js");

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
      const miembros = await grupoService.getContactosGrupo(idGrupo);

      const usuarios = miembros.map(miembro => miembro.miembroGrupo.usuarioAgregado?.idUsuario)
      
      await addMiembrosEmergencia(usuarios, emergencia);

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      const miembrosTokens = await grupoService.getUsuariosGrupoTokens(idGrupo);
      console.log(miembrosTokens)
      const tokens = miembrosTokens.map(miembro => miembro.miembroGrupo.usuarioAgregado?.idUsuario)

      await sendNotificationsMiembros(tokens, note);

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
      const miembros = await contactoService.getContactosDeUsuario(emergencia.idEmisor);
      const usuarios = miembros.map(miembro => miembro.usuarioAgregado?.idUsuario);

      await addMiembrosEmergencia(usuarios, emergencia);

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      const miembrosTokens = await contactoService.getUsuariosContactoTokens(emergencia.idEmisor);
      const tokens = miembrosTokens.map(miembro => miembro.usuarioAgregado?.token);
    
      await sendNotificationsMiembros(tokens, note);

      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }


  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @description Funcion para actualizar una emergencia y sus receptores
   */
  async updateEmergenciaGrupo(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      //crear emergencia
      const emergenciaAntigua = await service.getEmergencia(id);

      if(!emergenciaAntigua){
        return res.status(404).json({message: "No se encontró la emergencia"})
      }

      const emergencia = await service.updateEmergencia(id, req.body);

      //obtener los miembros del grupo
      const idGrupo = req.body.idGrupo;
      const miembros = await grupoService.getContactosGrupo(idGrupo);

      //obtener los receptores anteriores
      const receptores = await service.getEmergenciaReceptores(emergencia.idEmergencia);

      //obtener un set con los nuevos receptores y con los que se deben eliminar
      const antiguoGrupo = new Set(receptores.map(receptor => receptor.idReceptor));
      const nuevoGrupo = new Set(miembros.map(miembro => miembro.miembroGrupo.usuarioAgregado?.idUsuario));
      const nuevosReceptores = setDifference(nuevoGrupo, antiguoGrupo);
      const receptoresEliminados = setDifference(antiguoGrupo, nuevoGrupo);

      //remover los receptores que no están en el nuevo grupo
      await removeMiembrosEmergencia(receptoresEliminados, emergencia)

      //agregar a los receptores que no habían recibido la emergencia
      await addMiembrosEmergencia(nuevosReceptores, emergencia);

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      //se envia a todos los usuarios del grupo incluyendo a quienes la habian recibido previamente
      const miembrosTokens = await grupoService.getUsuariosGrupoTokens(idGrupo);
      const tokens = miembrosTokens.map(miembro => miembro.miembroGrupo.usuarioAgregado?.idUsuario)
      await sendNotificationsMiembros(tokens, note);

      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }



  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @description Funcion para actualizar una emergencia y sus receptores
   */
  async updateEmergenciaContactos(req, res) {
    const id = req.params.id;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(500).json({ message: "El Id necesita ser entero" });
    }
    try {
      //crear emergencia
      const emergenciaAntigua = await service.getEmergencia(id);

      if(!emergenciaAntigua){
        return res.status(404).json({message: "No se encontró la emergencia"})
      }

      const emergencia = await service.updateEmergencia(id, req.body);

      //obtener los contactos
      const miembros = await contactoService.getContactosDeUsuario(emergencia.idEmisor);

      //obtener los receptores anteriores
      const receptores = await service.getEmergenciaReceptores(emergencia.idEmergencia);

      //obtener un set con los nuevos receptores 
      const antiguoGrupo = new Set(receptores.map(receptor => receptor.idReceptor));
      const nuevoGrupo = new Set(miembros.map(miembro => miembro.usuarioAgregado?.idUsuario));      
      const nuevosReceptores = setDifference(nuevoGrupo, antiguoGrupo);

      //agregar a los receptores que no habían recibido la emergencia
      await addMiembrosEmergencia(nuevosReceptores, emergencia);

      //obtener usuario emisor
      const usuario = await usuarioService.getUsuario(emergencia.idEmisor);

      //generar notificacion
      const note = crearNotificacionEmergencia(emergencia, usuario);

      //enviar notificacion a los usuarios
      //se envia a todos los usuarios del grupo incluyendo a quienes la habian recibido previamente
      const miembrosTokens = await contactoService.getUsuariosContactoTokens(emergencia.idEmisor);
      const tokens = miembrosTokens.map(miembro => miembro.usuarioAgregado?.token);
    
      await sendNotificationsMiembros(tokens, note);
      return res.status(200).json({ data: emergencia });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al crear el emergencia. Err: ${err}` });
    }
  }

}


/**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @description Funcion para agregar a una emergencia a los miembros
   */
async function addMiembrosEmergencia(idsUsuarios, emergencia){  
  for (let i = 0; i < idsUsuarios.length; i++) {
    if(idsUsuarios[i]){
      await service.addEmergenciaReceptor(
        emergencia.idEmergencia,
        idsUsuarios[i]
      );
    }
  }
}

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @description Funcion para remover de una emergencia a los miembros
 */
async function removeMiembrosEmergencia(idsUsuarios, emergencia){  
  for (let i = 0; i < idsUsuarios.length; i++) {
    if(idsUsuarios[i]){
      await service.removeEmergenciaReceptor(
        emergencia.idEmergencia,
        idsUsuarios[i]
      );
    }
  }
}


  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {Miembro} lista de miembros a enviar la notifcacion
   * @params {Note} notificacion
   * @description Funcion para enviar notificaciones
   */
  async function sendNotificationsMiembros(tokensUsuarios, note){
    tokensUsuarios.forEach((tokenUsuario) => {
      if (tokenUsuario) {
        apnProvider.send(note, tokenUsuario).then((result) => {
          if (result.failed && result.failed.length > 0) {
            console.log(result.failed)
            console.log(
              `Error sending push notification: ${tokenUsuario}`
            );
          } else if (result.sent && result.sent.length > 0) {
            console.log(
              `Push Notification sent to device: ${tokenUsuario}`
            );
          } else {
            console.log(`Unknown error while sending push notification`);
          }
        });
      }
    });
  }


module.exports = EmergenciaController;
