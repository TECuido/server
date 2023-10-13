const postsRouter = require("./usuario.js");
const authRouter = require("./auth.js")

function routerApi(app) {
  app.use('/', authRouter)
  app.use("/usuarios", postsRouter);
}

module.exports = routerApi;
