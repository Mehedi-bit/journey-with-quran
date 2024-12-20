const express = require('express')
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getAllPosts } = require('../controllers/postController.js')
const protectRoute = require('../middlewares/protectRoute.js')

const router = express.Router()



router.get('/all', getAllPosts)
router.get('/feed', protectRoute, getFeedPosts)
router.get('/:id', getPost)
router.post('/create', protectRoute, createPost) 
router.delete('/:id', protectRoute, deletePost)
router.post('/like/:id', protectRoute, likeUnlikePost)
router.post('/reply/:id', protectRoute, replyToPost)






// Export the router
module.exports = router

