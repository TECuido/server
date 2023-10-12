const PostsServices = require('../services/posts.js')

const service = new PostsServices()

class PostsController {
    constructor() {}

    async getAllPosts(req, res) {
        try {
            const posts = await service.getAllPosts();
            return res.status(200).json({posts})
        } catch(err){
            return res.status(500).json({"message": `Error al obtener los posts. Err: ${err}`})
        }
    }

    async getPost(req, res){
        const id = req.params.id
        if (!Number.isInteger(parseInt(id))){
            return res.status(500).json({"message": "El Id necesita ser entero"})
        }
        try {
            const post = await service.getPost(id);
            if(post){
                return res.status(200).json({post})
            } else {
                return res.status(404).json({"message": "No se encontró el post"})
            }

        } catch (err){
            return res.status(500).json({"message": `Error al obtener los usuarios. Err: ${err}`})
        }
    }

    async addPost(req, res){
        try {
            const post = await service.createPost(req.body);
            return res.status(200).json({post})
        } catch(err){
            return res.status(500).json({"message": `Error al obtener los posts. Err: ${err}`})
        }
    }

    async updatePost(req, res) {
        const id = req.params.id
        if (!Number.isInteger(parseInt(id))){
            return res.status(500).json({"message": "El Id necesita ser entero"})
        }
        try {
            const post = await service.updatePost(id, req.body);
            return res.status(200).json({post})

        } catch (err){
            return res.status(500).json({"message": `Error al obtener los usuarios. Err: ${err}`})
        }
    }

    async deletePost(req, res){
        const id = req.params.id
        if (!Number.isInteger(parseInt(id))){
            return res.status(500).json({"message": "El Id necesita ser entero"})
        }
        try {
            await service.deletePost(id);
            return res.status(200).json({"message": "Se ha eliminado el post correctamente"})

        } catch (err){
            return res.status(500).json({"message": `Error al obtener los usuarios. Err: ${err}`})
        }
    }
}

module.exports = PostsController

