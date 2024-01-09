const usuariosRouter = require("./usuario.js");
const authRouter = require("./auth.js");
const emergenciasRouter = require("./emergencia.js");
const contactosRouter = require("./contacto.js");
const gruposRouter = require("./grupo.js");
const llamadaRouter = require("./llamada.js");
const medicamentoRouter = require("./medicamento.js");
const recetaRouter = require("./receta.js");
const usuarioDetalleRouter = require("./usuariodetalles.js");
const alergiasRouter = require("./alergias.js");
const condicionMedicaRouter = require("./condicionMedica.js");
const medicamentosActualesRouter = require("./medicamentosActuales.js");
const medicoTratanteRouter = require("./medicoTratante.js");
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
  app.use("/llamadas", llamadaRouter);
  app.use("/recetas", recetaRouter);
  app.use("/usuariodetalles", usuarioDetalleRouter);
  app.use("/medicamentos", medicamentoRouter);
  app.use("/alergias", alergiasRouter);
  app.use("/condicionMedica", condicionMedicaRouter);
  app.use("/medicamentosActuales",  medicamentosActualesRouter);
  app.use("/medicoTratante",  medicoTratanteRouter);
}

module.exports = routerApi;
