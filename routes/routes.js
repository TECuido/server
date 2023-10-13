const postsRouter = require("./usuario.js");

function routerApi(app) {
  //app.use('/posts', postsRouter)
  app.use("/usuarios", postsRouter);
}

module.exports = routerApi;
