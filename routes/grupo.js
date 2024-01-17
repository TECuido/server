const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const GrupoController = require("../controllers/grupo");
const { getGrupoSchema, createGrupoSchema, createMiembroSchema, deleteMiembroSchema, updateGrupoSchema } = require("../schemas/grupo.schema.js");

const controller = new GrupoController();

router.get("/:id", isAuthenticated,   validatorHandler(getGrupoSchema, "params"), controller.getGrupo);
router.get("/:id/usuarios", isAuthenticated,  validatorHandler(getGrupoSchema, "params"), controller.getContactosGrupo);
router.get("/usuario/:id", isAuthenticated,  validatorHandler(getGrupoSchema, "params"), controller.getGruposUsuario);
router.post("/", isAuthenticated, validatorHandler(createGrupoSchema, "body"), controller.addGrupo);
router.post("/usuario", isAuthenticated,  validatorHandler(createMiembroSchema, "body"), controller.addContactoToGrupo);
router.put("/:id",  isAuthenticated, validatorHandler(getGrupoSchema, "params"), validatorHandler(updateGrupoSchema, "body"),  controller.updateGrupoName);
router.delete("/:id", isAuthenticated,  validatorHandler(getGrupoSchema, "params"), controller.deleteGrupo);
router.delete("/:idGrupo/:idMiembro", isAuthenticated, validatorHandler(deleteMiembroSchema, "params"), controller.deleteMiembroByGrupo);
module.exports = router;
