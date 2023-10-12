const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

class PostsService {
    constructor() {}

    async getAllPosts() {
        const posts = await prisma.post.findMany()
        return posts
    }

    async getPost(id){
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })
        return post
    }

    async createPost({title, content}) {
        const result = await prisma.post.create({
            data: {
                title, content
            }
        })
        return result
    }

    async updatePost(id, {title, content}){
        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: {title, content}
        })
        return post
    }

    async deletePost(id){
        await prisma.post.delete({
            where: {id: Number(id)}
        })
    }
}

module.exports = PostsService