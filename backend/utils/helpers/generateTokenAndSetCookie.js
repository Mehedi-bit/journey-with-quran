
const jwt = require('jsonwebtoken');



const generateTokenAndSetCookie = (userId, res) => {

    // generate a token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    // set the token in a cookie
    res.cookie('jwt', token, {
        httpOnly: true, // cookie cannot be accessed or modified by the browser
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'strict' // the cookie will only be sent in requests to the same site
    })

    return token
}








// Export the function
module.exports = generateTokenAndSetCookie