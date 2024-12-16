const express = require('express')
const { signupUser, loginUser, logoutUser, followUnFollowUser } = require('../controllers/userController.js')
const protectRoute = require('../middlewares/protectRoute.js')


const router = express.Router()




router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser)    // protectRoute middleware is for: if you are not a logged in user, you cannot follow or unFollow a user, only certain people can follow or unFollow a user, so we need to protect this route







// Export the router
module.exports = router