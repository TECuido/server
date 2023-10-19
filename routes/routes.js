const usuariosRouter = require("./usuario.js");
const authRouter = require("./auth.js");
const emergenciasRouter = require("./emergencia.js");
const contactosRouter = require("./contacto.js");
const gruposRouter = require("./grupo.js");

function routerApi(app) {
  app.use("/", authRouter);
  app.use("/usuarios", usuariosRouter);
  app.use("/emergencias", emergenciasRouter);
  app.use("/contactos", contactosRouter);
  app.use("/grupos", gruposRouter);
}

module.exports = routerApi;
