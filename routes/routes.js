const postsRouter = require('./posts.js')

function routerApi(app){
    app.use('/posts', postsRouter)
}

module.exports = routerApi;