const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie")



// Signup a new user
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



// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // First check if the user exists
        const user = await User.findOne({email})
        
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // Then check if password is correct
        const passwordCorrect = await bcrypt.compare(password, user.password)

        if (!passwordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // If both checks pass, generate token and send response
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            followers: user.followers,
            following: user.following,
            bio: user.bio,
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from loginUser controller: ", err.message)
    }
}












// export all the functions
module.exports = {
    signupUser,
    loginUser,
}