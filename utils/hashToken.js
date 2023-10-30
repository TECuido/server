const crypto = require("crypto");

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params None
 * @description  Es el encargado de encriptar el token con sha512
 * @returns
 */
function hashToken(token) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

module.exports = { hashToken };
