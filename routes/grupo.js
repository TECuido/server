const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")
const validatorHandler = require("../middlewares/validator.js");

const router = express.Router();
const GrupoController = require("../controllers/grupo");
const { getGrupoSchema, createGrupoSchema, createMiembroSchema, deleteMiembroSchema, updateGrupoSchema } = require("../schemas/grupo.schema.js");

const controller = new GrupoController();

router.get("/:id",  validatorHandler(getGrupoSchema, "params"), controller.getGrupo);
router.get("/:id/usuarios",  validatorHandler(getGrupoSchema, "params"), controller.getContactosGrupo);
router.get("/usuario/:id",  validatorHandler(getGrupoSchema, "params"), controller.getGruposUsuario);
router.post("/", validatorHandler(createGrupoSchema, "body"), controller.addGrupo);
router.post("/usuario",  validatorHandler(createMiembroSchema, "body"), controller.addContactoToGrupo);
router.put("/:id",  validatorHandler(getGrupoSchema, "params"), validatorHandler(updateGrupoSchema, "body"),  controller.updateGrupoName);
router.delete("/:id",  validatorHandler(getGrupoSchema, "params"), controller.deleteGrupo);
router.delete("/:idGrupo/:idMiembro", validatorHandler(deleteMiembroSchema, "params"), controller.deleteMiembroByGrupo);
module.exports = router;
