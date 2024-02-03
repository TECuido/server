// Aqui llamamos al servicio de express y las rutas a utilizar
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const config = require("./config/config");

const routerApi = require("./routes/routes");

const app = express();

app.use(cors());
app.use(helmet());

// Aqui voy a poner el limite de llamadas
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Una hora
  max: 1000, // Limite de  llamadas por una hora
});

// Uso de tokens
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(limiter);
app.use(morgan("tiny"));

//Aqui checamos que que este funcionando
app.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});

routerApi(app);

//Aqui checamos que que este funcionando
app.listen(config.port, () =>
  console.log("El Servidor esta listo en http://localhost:" + config.port)
);
