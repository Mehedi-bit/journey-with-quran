const express = require('express')
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getAllPosts, getUserPosts } = require('../controllers/postController.js')
const protectRoute = require('../middlewares/protectRoute.js')

const router = express.Router()



router.get('/all', getAllPosts)
router.get('/feed', protectRoute, getFeedPosts)
router.get('/:id', getPost)
router.get('/user/:username', getUserPosts)
router.post('/create', protectRoute, createPost) 
router.delete('/:id', protectRoute, deletePost)
router.put('/like/:id', protectRoute, likeUnlikePost)
router.put('/reply/:id', protectRoute, replyToPost)






// Export the router
module.exports = router

