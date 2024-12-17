const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie")








// Get a user profile
const getUserProfile = async (req, res) => {

    const { id } = req.params

    try {

        const user = await User.findById(id).select('-password').select('-__v').select('-updatedAt').select('-email')

        if (!user) return res.status(404).json({ message: "User not found" })

        // send the user data in the response
        res.status(200).json(user)
        

        
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from getUserProfile controller: ", err.message)
    }


}






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

        // Then check if password is correct (after user exists, thus user.password will be never null while comparing using bcrypt)
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






// Logout a user

const logoutUser = async (req, res) => {
    try {

        // set the cookie to an empty string and set the maxAge to 0
        res.cookie('jwt', '', {
            maxAge: 0,
        })

        res.status(200).json({ message: "User logged out" })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from logoutUser controller: ", err.message)
    }
}




// Follow and UnFollow a user

const followUnFollowUser = async (req, res) => {
    try {

        const { id } = req.params

        // user who is being followed or unFollowed
        const userToModify = await User.findById(id)
        // user who is following or unFollowing (user who is logged in)
        const currentUser = await User.findById(req.user._id)

        // check if the the user trying to follow or unFollow is the same as the user who is logged in
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow or unfollow yourself" })
        }

        // check if the userToModify or currentUser exists
        if (!userToModify || !currentUser) {
            return res.status(404).json({ message: "User not found" })
        }


        // check if the user is already followed
        // if already followed, then unFollow the user
        // otherwise follow the user
        if (currentUser.following.includes(id)) {
            // unFollow the user
            // remove/pull the id from the following array of the currentUser
            // and remove/pull the id from the followers array of the userToModify
            await User.findByIdAndUpdate(
                {_id: req.user._id},
                {$pull: {following: id}}
            )

            await User.findByIdAndUpdate(
                {_id: id},
                {$pull: {followers: req.user._id}}
            )
            
            res.status(200).json({ message: "User unFollowed successfully" })

        } else {
            // follow the user
            // add/push the id to the following array of the currentUser
            // and add/push the id to the followers array of the userToModify
            await User.findByIdAndUpdate(
                {_id: req.user._id},
                {$push: {following: id}}
            )

            await User.findByIdAndUpdate(
                {_id: id},
                {$push: {followers: req.user._id}}
            )

            res.status(200).json({ message: "User followed successfully" })
        }
        


        


    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from followUnFollowUser controller: ", err.message)
    }
}






// Update a user

const updateUser = async (req, res) => {

    let { name, email, password, bio } = req.body
    let { profilePic } = req.body


    try {

        // check if the user exists
        let user = await User.findById(req.user._id)

        if (!user) return res.status(400).json({ message: "User not found" })
        
        // user cannot update another user's profile
        if (req.params.id !== req.user._id.toString())  return res.status(400).json({ message: "You cannot update another user's profile" })

        // hash the password if it exists
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }


        


        // update the user
        user.name = name || user.name
        user.email = email || user.email
        user.bio = bio || user.bio
        user.profilePic = profilePic || user.profilePic


        // save the user to the database
        user = await user.save()



        

        // send the updated user data in the response
        res.status(200).json({ message: "User updated successfully", user })
       

            
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from updateUser controller: ", err.message)
    }


}











// export all the functions
module.exports = {
    getUserProfile,
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
}