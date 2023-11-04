const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * @author Julio Meza
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui checamos que el usuario sea valido
 */
function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Falta autorización" });
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, config.accessSecret);
    req.payload = payload;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "TokenExpiredError" });
    } else {
      return res.status(401).json({ message: "No autorizado" });
    }
  }

  return next();
}

module.exports = {
  isAuthenticated,
};
