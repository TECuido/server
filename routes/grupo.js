const express = require("express");
const {isAuthenticated} = require("../middlewares/auth.js")

const router = express.Router();
const GrupoController = require("../controllers/grupo");

const controller = new GrupoController();

router.get("/", isAuthenticated, controller.getAllGrupos);
router.get("/:id", isAuthenticated, controller.getGrupo);
router.get("/:id/usuarios", isAuthenticated, controller.getUsuariosGrupo);
router.get("/usuario/:id", isAuthenticated, controller.getGruposUsuario);
router.post("/", isAuthenticated, controller.addGrupo);
router.post("/usuario", isAuthenticated, controller.addUsuarioToGrupo);
router.put("/:id", isAuthenticated, controller.updateGrupoName);
router.delete("/:id", isAuthenticated, controller.deleteGrupo);
router.delete("/:idGrupo/:idMiembro", isAuthenticated, controller.deleteMiembroByGrupo);
module.exports = router;
