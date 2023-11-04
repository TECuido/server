const NotificationService = require("../services/notification.js");

const service = new NotificationService();

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui se hacen los metodos relacionados con las notificaciones remotas */

class NotificationController {
  constructor() {}
  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async addNotificationToken(req, res) {
    try {
      const usuario = await service.addNotificationToken(req.body);
      return res.status(200).json({ data: { idUsuario: usuario.idUsuario, token: usuario.token } });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al enviar la notificacion. Err: ${err}` });
    }
  }
}

module.exports = NotificationController;
