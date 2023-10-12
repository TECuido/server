const express = require('express')
const router = express.Router()
const PostsController = require('../controllers/posts')

const controller = new PostsController()

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)
router.post('/', controller.addPost)
router.put('/:id', controller.updatePost)
router.delete("/:id", controller.deletePost)

module.exports = router;