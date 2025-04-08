const User = require("../models/userModel.js")
const Post = require("../models/postModel.js")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie.js")
const mongoose = require("mongoose")
const cloudinary = require('cloudinary').v2





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

        if (!user) return res.status(404).json({ error: "User not found" })

        // send the user data in the response
        res.status(200).json(user)
        

        
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getUserProfile controller: ", err.message)
    }


}






// Signup a new user
const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body

        // Check if email exists
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ 
                error: "Email is already registered",
                field: "email"
            })
        }

        // Check if username exists
        const usernameExists = await User.findOne({ username })
        if (usernameExists) {
            return res.status(400).json({ 
                error: "Username is already taken",
                field: "username"
            })
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
                profilePic: newUser.profilePic,
            })

        } else {
            res.status(400).json({ error: "Invalid user data" })
        }





    } catch (err) {
        res.status(500).json({ error: err.message })
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
            return res.status(400).json({ error: "Invalid credentials" })
        }

        // Then check if password is correct (after user exists, thus user.password will be never null while comparing using bcrypt)
        const passwordCorrect = await bcrypt.compare(password, user.password)

        if (!passwordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        // If both checks pass, generate token and send response
        const token = generateTokenAndSetCookie(user._id, res)

        

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
        res.status(500).json({ error: err.message })
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
        res.status(500).json({ error: err.message })
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
            return res.status(400).json({ error: "You cannot follow or unfollow yourself" })
        }

        // start a transaction
        session.startTransaction()

        // Find both users: the one to follow/unFollow and the current user
        const userToModify = await User.findById(id).session(session)
        const currentUser = await User.findById(req.user._id).session(session)

        // Validate that both users exist
        if (!userToModify || !currentUser) {
            await session.abortTransaction()
            return res.status(404).json({ error: "User not found" })
        }

        // Check if already following and determine operation type
        const isAlreadyFollowing = currentUser.following.includes(id)
        const operation = isAlreadyFollowing ? '$pull' : '$push'  // pull = remove/unfollow, push = add/follow

        // Update the following list of the current user and the followers list of the target user
        // Perform updates within the transaction
        await User.findByIdAndUpdate(
            req.user._id,
            { [operation]: { following: id } },
            { session }
        );

        await User.findByIdAndUpdate(
            id,
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
        res.status(500).json({ error: err.message })
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

        if (!user) return res.status(400).json({ error: "User not found" })
        
        // user cannot update another user's profile
        if (req.params.id !== req.user._id.toString())  return res.status(400).json({ error: "You cannot update another user's profile" })


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
                return res.status(400).json({ error: "Email or username already taken" })
            }


        }


        


        // hash the password if it is provided
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }




        // handle profilePic upload or direct selection
        // if the profilePic is provided from the frontend, then upload the image to cloudinary and update the profilePic before saving in the database
        if (profilePic) {
            const isBase64 = profilePic.startsWith("data:image");

            if (isBase64) {
                // delete previous image from cloudinary (if it was uploaded)
                if (user.profilePic && user.profilePic.includes("cloudinary.com")) {
                    const publicId = user.profilePic.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                }

                // upload new image to cloudinary
                const uploadedResponse = await cloudinary.uploader.upload(profilePic);
                profilePic = uploadedResponse.secure_url;
            }

            // whether uploaded or selected, update it
            user.profilePic = profilePic;
        }


        // update other fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;


        // save the user to the database
        user = await user.save()



        // find all the posts that the user replied and then update the name, username , and profilePic of the user in the post
        await Post.updateMany(
            { "replies.userId": req.user._id },

            {
                $set: {
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].name": user.name,
                    "replies.$[reply].profilePic": user.profilePic
                }
            },

            { arrayFilters: [{ "reply.userId": req.user._id }] }   // ensure that we only update the replies of the user who is logged in (current user)

        )


        // password should be null in response to secure
        user.password = null
        

        // send the updated user data in the response
        res.status(200).json(user)
       
            
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from updateUser controller: ", err)
    }


}







// Get suggested users
const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id

        // Get the list of users already followed by the current user
        const currentUser = await User.findById(userId).select("following")
        const followingIds = currentUser.following.map(id => id.toString()) // Converted to Array of strings of IDs for comparison

        // Find 10 random users excluding the current user
        const users = await User.aggregate([
            { $match: { _id: { $ne: userId } } },
            { $sample: { size: 10 } }
        ])

        // Filter out users already followed by the current user (and only keep 4)
        const suggestedUsers = users.filter(user => !followingIds.includes(user._id.toString()))
        .slice(0, 4) // Only keep 4 users


        // secure sensitive info like passwords of the suggested users
        suggestedUsers.forEach(user => {
            user.password = null
        })


        // Send the suggested users as a response
        res.status(200).json(suggestedUsers)

    } catch (err) {
        console.error("Error from getSuggestedUsers controller:", err.message)
        res.status(500).json({ error: err.message })
    }
};







// export all the functions
module.exports = {
    getUserProfile,
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getSuggestedUsers,
}