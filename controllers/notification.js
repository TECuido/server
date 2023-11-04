const NotificationService = require("../services/notification");

const service = new NotificationServices();

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui se hacen los metodos relacionados con las notificaciones remotas */

class GrupoController {
  constructor() {}
  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params Sin parametros
   * @description Funcion que te da todos los grupos
   */
  async postNotificationToken(req, res) {
    try {
      const notificationToken = await service.postNotificationToken(req.body);
      return res.status(200).json({ data: notificationToken });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al enviar la notificacion. Err: ${err}` });
    }
  }
}

module.exports = GrupoController;
