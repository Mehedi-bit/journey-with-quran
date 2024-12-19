const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')


const protectRoute = async (req, res, next) => {
    try {
        // get the token from the cookie
        const token = req.cookies.jwt

        // check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, you need to be logged in to access this route" })
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // userId was set as a payload in the token in the generateTokenAndSetCookie function
        const user = await User.findById(decoded.userId).select('-password')

        // set the user as payload in the request object so that we can access the user in the controller (for ex: userController/followUnFollowUser or updateProfile functions)
        req.user = user 

        next()



    } catch (err) {
        res.status(401).json({ message: "Unauthorized, you need to be logged in to access this route" })
        console.log("Error from protectRoute middleware: ", err.message)
    }
}






// Export the middleware
module.exports = protectRoute