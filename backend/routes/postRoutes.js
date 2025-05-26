const express = require('express')
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getAllPosts, getUserPosts, deleteComment, getAsmaulHusnaPosts } = require('../controllers/postController.js')
const protectRoute = require('../middlewares/protectRoute.js')

const router = express.Router()



router.get('/all', getAllPosts)
router.get('/feed', protectRoute, getFeedPosts)
router.get('/asmaul-husna', getAsmaulHusnaPosts)
router.get('/:id', getPost)
router.get('/user/:username', getUserPosts)
router.post('/create', protectRoute, createPost) 
router.delete('/:id', protectRoute, deletePost)
router.put('/like/:id', protectRoute, likeUnlikePost)
router.put('/reply/:id', protectRoute, replyToPost)
router.put('/reply/delete/:commentId', protectRoute, deleteComment)







// Export the router
module.exports = router

