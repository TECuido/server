const express = require("express");
const routerApi = require("./routes/routes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOLA MUNDO");
});

routerApi(app);

app.listen(3000, () =>
  console.log("El Servidor esta listo en http://localhost:3000")
);
