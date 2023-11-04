const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const NotificationsController = require("../controllers/notifications");

const controller = new NotificationsController();

// Ruteo de la parte de usuario
router.post("/token", controller.addToken)

module.exports = router;
