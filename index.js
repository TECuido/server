// Aqui llamamos al servicio de express y las rutas a utilizar
const express = require("express");
const routerApi = require("./routes/routes");

const app = express();

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
