const express = require('express')
const { signupUser, loginUser, logoutUser,
     followUnFollowUser, updateUser, getUserProfile,
      getSuggestedUsers, 
      getAllUsers} = require('../controllers/userController.js')
const protectRoute = require('../middlewares/protectRoute.js')


const router = express.Router()
 



router.get('/profile/:query', getUserProfile)
router.get('/suggested', protectRoute, getSuggestedUsers)
router.get('/all', getAllUsers) 
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser)    // protectRoute middleware is for: if you are not a logged in user, you cannot follow or unFollow a user, only certain people can follow or unFollow a user, so we need to protect this route
router.put('/update/:id', protectRoute, updateUser)   








// Export the router
module.exports = router