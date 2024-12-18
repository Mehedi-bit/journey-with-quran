const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie")
const mongoose = require("mongoose")
// const cloudinary = require('cloudinary').v2








// Get a user profile
const getUserProfile = async (req, res) => {

    // We will fetch user profile either with username or id
	// query is either username or userId
    const { query } = req.params

    try {

        let user

        // if the query is id/valid id then find the user by id
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({_id: query}).select('-password').select('-__v').select('-updatedAt')
        } else {
            // else query is username, then  find the user by username
            user = await User.findOne({username: query}).select('-password').select('-__v').select('-updatedAt')
        }

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
        const { name, email, username, password } = req.body

        // Check if the user already exists (if the email or username is already in the database)
        const userExists = await User.findOne(
            {
                $or: [
                    {email: email},
                    {username: username}
                ]
            }
        )

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
            username,
            password: hashedPassword,
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
                username: newUser.username,
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
        const { password } = req.body
        const emailOrUsername = req.body.email || req.body.username

        // First find the user and check if the user exists
        const user = await User.findOne({
            $or: [
                {email: emailOrUsername},
                {username: emailOrUsername}
            ]
        })
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // Then check if password is correct (after user exists, thus user.password will be never null while comparing using bcrypt)
        const passwordCorrect = await bcrypt.compare(password, user.password)

        if (!passwordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        // If both checks pass, generate token and send response
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            followers: user.followers,
            following: user.following,
            bio: user.bio,
            profilePic: user.profilePic,
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

        res.status(200).json({ message: "User logged out successfully" })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("Error from logoutUser controller: ", err.message)
    }
}




// Follow and UnFollow a user

const followUnFollowUser = async (req, res) => {

    // Start a session to perform both updates in a transaction (both updates should succeed or fail together)
    // removing from following list of the current user and removing from followers list of the target user
    const session = await mongoose.startSession()

    try {
        const { id } = req.params

        // Prevent self-following
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow or unfollow yourself" })
        }

        // start a transaction
        session.startTransaction()

        // Find both users: the one to follow/unFollow and the current user
        const userToModify = await User.findById(id).session(session)
        const currentUser = await User.findById(req.user._id).session(session)

        // Validate that both users exist
        if (!userToModify || !currentUser) {
            await session.abortTransaction()
            return res.status(404).json({ message: "User not found" })
        }

        // Check if already following and determine operation type
        const isAlreadyFollowing = currentUser.following.includes(id)
        const operation = isAlreadyFollowing ? '$pull' : '$push'  // pull = remove/unfollow, push = add/follow

        // Perform updates within the transaction
        await User.findByIdAndUpdate(
            { _id: req.user._id },
            { [operation]: { following: id } },
            { session }
        );

        await User.findByIdAndUpdate(
            { _id: id },
            { [operation]: { followers: req.user._id } },
            { session }
        );


        // Commit the transaction if everything is successful
        await session.commitTransaction()


        // Send success response
        res.status(200).json({ 
            message: `User ${isAlreadyFollowing ? 'unfollowed' : 'followed'} successfully` 
        })

    } catch (err) {
        // Rollback the transaction if any error occurs
        await session.abortTransaction()
        res.status(500).json({ message: err.message })
        console.log("Error from followUnFollowUser controller: ", err.message)
    } finally {
        session.endSession()
    }
}






// Update a user

const updateUser = async (req, res) => {

    let { name, email, username, password, bio, profilePic } = req.body


    try {

        // check if the user exists
        let user = await User.findById(req.user._id)

        if (!user) return res.status(400).json({ message: "User not found" })
        
        // user cannot update another user's profile
        if (req.params.id !== req.user._id.toString())  return res.status(400).json({ message: "You cannot update another user's profile" })


        // check if the email or username is already taken by another user
        if (email || username) {
            const userExists = await User.findOne(
                {
                    $and: [
                        { _id: { $ne: req.user._id } },
                        { 
                            $or: [
                                {email: email || ""},
                                {username: username || ""}
                            ]
                         }
                    ]
                }
            )


            if (userExists) {
                return res.status(400).json({ message: "Email or username already taken" })
            }


        }


        


        // hash the password if it is provided
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }


        // @TODO: Uncomment
        // // update the profilePic in cloudinary if it exists
        // if (profilePic) {
        //     // check if the user already has a profilePic
        //     if (user.profilePic) {
        //         // if the user already has a profilePic, then delete the previous profilePic from cloudinary
        //         // get the publicId of the profilePic from the url
        //         // for ex: https://res.cloudinary.com/dx3w3v7g2/image/upload/v1629780000/ProfilePics/person.jpg
        //         // publicId: filename without extension - here, person
        //         const publicId = user.profilePic.split("/").pop().split(".")[0]
        //         await cloudinary.uploader.destroy(publicId)
        //     }

        //     // upload the new profilePic to cloudinary
        //     const result = await cloudinary.uploader.upload(profilePic)
        //     // set the profilePic to the url of the uploaded image
        //     profilePic = result.secure_url
        // }


        // update the user
        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio


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