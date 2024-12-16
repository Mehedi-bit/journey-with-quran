const express = require('express')
const { signupUser } = require('../controllers/userController.js')
const { loginUser } = require('../controllers/userController.js')


const router = express.Router()




router.post('/signup', signupUser)
router.post('/login', loginUser)






// Export the router
module.exports = router