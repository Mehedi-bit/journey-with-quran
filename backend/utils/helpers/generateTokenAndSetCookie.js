
const jwt = require('jsonwebtoken');



const generateTokenAndSetCookie = (userId, res) => {

    // generate a token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    

    // set the token in a cookie
    res.cookie('jwt', token, {
        // cookie cannot be accessed or modified by the browser
        httpOnly: true, 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        // set samesite none
        sameSite: 'lax',
    })

    
    
    // @TODO: Test purpose only. Remove this line 
    // res.json({
    //     token: token
    // })

    return token
}








// Export the function
module.exports = generateTokenAndSetCookie