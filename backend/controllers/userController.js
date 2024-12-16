const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie")


const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if the user already exists (if the email is already in the database)
        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        // else create a new user
        // first hash the password using bcrypt

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // then create the user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        
        // save the user to the database
        await newUser.save()

        // check if the user was created successfully
        if (newUser) {

            // generate token and set cookie, we will get a cookie in the response as this function set a token as cookie in the res
            generateTokenAndSetCookie(newUser._id, res)

            // send the user data in the response just for checking
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
                followers: newUser.followers,
                following: newUser.following,
                bio: newUser.bio,
            })

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }





    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from signupUser controller: ", err.message)
    }
}












// export all the functions
module.exports = {
    signupUser,
}