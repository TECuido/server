const express = require("express");
const { isAuthenticated } = require("../middlewares/auth.js");

const router = express.Router();
const NotificationsController = require("../controllers/notification.js");

const controller = new NotificationsController();

// Ruteo de la parte de usuario
router.post("/token", controller.addNotificationToken)

module.exports = router;
