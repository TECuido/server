const usuariosRouter = require("./usuario.js");
const authRouter = require("./auth.js");
const emergenciasRouter = require("./emergencia.js");
const contactosRouter = require("./contacto.js");

function routerApi(app) {
  app.use("/", authRouter);
  app.use("/usuarios", usuariosRouter);
  app.use("/emergencias", emergenciasRouter);
  app.use("/contactos", contactosRouter);
}

module.exports = routerApi;
