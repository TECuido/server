const { db } = require("../utils/db")
const {hashToken} = require("../utils/hashToken")


/**
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui estan los metodos de login y registro
 */
class AuthService {
  constructor() {}

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {jti} - id del token
   * @params {refreshToken} 
   * @params {idUsuario} - id del usuario 
   * @description  Funcion para añadir un refresh token a la lista de tokens autorizados
   */
  async addRefreshTokenToWhitelist({ jti, refreshToken, idUsuario }) {
    return await db.refreshToken.create({
      data: {
        idToken: jti,
        hashedToken: hashToken(refreshToken),
        idUsuario
      },
    });
  }

   /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {id} - id del token
   * @description  Obtener un token por su id
   */
  async findRefreshTokenById(id) {
    return await db.refreshToken.findUnique({
      where: {
        idToken: id,
      },
    });
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {id} - id del token
   * @description  Marcar token como revocado
   */
  async deleteRefreshToken(id) {
    return await db.refreshToken.update({
      where: {
        idToken: id,
      },
      data: {
        revoked: true
      }
    });
  }

  /**
   * @author Julio Meza
   * @version 1.0.1
   * @license Gp
   * @params {userId} - id del ususario
   * @description  Marcar como revocados todos los tokens de un usuario
   */
  async revokeTokens(userId) {
    return await db.refreshToken.updateMany({
      where: {
        idUsuario: userId
      },
      data: {
        revoked: true
      }
    });
  }

  
}

module.exports = AuthService;
