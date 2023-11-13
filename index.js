// Aqui llamamos al servicio de express y las rutas a utilizar
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routerApi = require("./routes/routes");

const app = express();
app.use(cors());
app.use(helmet());

// Uso de tokens
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Aqui checamos que que este funcionando
app.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});

routerApi(app);

//Aqui checamos que que este funcionando
app.listen(3000, () =>
  console.log("El Servidor esta listo en http://localhost:3000")
);
