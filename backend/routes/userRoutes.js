const express = require('express')
const { signupUser } = require('../controllers/userController.js')

const router = express.Router()




router.post('/signup', signupUser)






// Export the router
module.exports = router