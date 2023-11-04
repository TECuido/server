const usuariosRouter = require("./usuario.js");
const authRouter = require("./auth.js");
const emergenciasRouter = require("./emergencia.js");
const contactosRouter = require("./contacto.js");
const gruposRouter = require("./grupo.js");
const notiicationRouter = require("./notification.js")

/**
 * @author Julio Meza y Bernardo de la Sierra
 * @version 1.0.1
 * @license Gp
 * @params Sin parametros
 * @description Aqui ligamos todos los servicios
 */
function routerApi(app) {
  app.use("/", authRouter);
  app.use("/usuarios", usuariosRouter);
  app.use("/emergencias", emergenciasRouter);
  app.use("/contactos", contactosRouter);
  app.use("/grupos", gruposRouter);
  app.use("/notificaciones", notiicationRouter);
}

module.exports = routerApi;
