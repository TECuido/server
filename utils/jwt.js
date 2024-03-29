const jwt = require('jsonwebtoken');
const config = require("../config/config")

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params {user} Datos del usuario 
 * @description crear token de acceso, expira en 5 minutos
 * @returns 
 */
function generateAccessToken(user) {
    return jwt.sign({ idUsuario: user.idUsuario }, config.accessSecret, {
      expiresIn: '5m',
    });
  }
  

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params {user} Datos del usuario 
 * @description crear refresh token para mantener al usuario loggeado, dura 24 h
 * @returns 
 */
function generateRefreshToken(user, jti) {
    return jwt.sign({
      idUsuario: user.idUsuario,
      jti
    }, config.refreshSecret, {
      expiresIn: '60d',
    });
}

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params {user, jti} Datos del usuario, id del token 
 * @description crear conjunto de tokens
 * @returns 
 */
function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken
    };
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
}
