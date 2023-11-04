const { db } = require("../utils/db");

class NotificationService {
    constructor() {}
    /**
     * @author Julio Meza
     * @version 1.0.1
     * @license Gp
     * @params idUsuario, token
     * @description Funcion que agrega un token de notificacion a un usuario
     */
    async addNotificationToken({idUsuario, token}) {
      const usuario = await db.usuario.update({
        where: {
          idUsuario: idUsuario
        },
        data: {
          token: token
        }
      });
      return usuario;
    }
}

module.exports = NotificationService;
