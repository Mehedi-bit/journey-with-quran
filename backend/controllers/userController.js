const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/helpers/generateTokenAndSetCookie")
const { default: mongoose } = require("mongoose")








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
    try {

        const { id } = req.params

        // check if trying to self-follow
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow or unfollow yourself" })
        }


        // Start a session for transaction
        const session = await User.startSession()
        session.startTransaction()


        try {
            // Fetch both users in one go with only necessary fields and with the session
            // Fetching data in parallel, reducing overall execution time
            const [userToModify, currentUser] = await Promise.all([
                User.findById(id).select('followers').session(session),
                User.findById(req.user._id).select('following').session(session)
            ])


            // check if the userToModify or currentUser exists
            if (!userToModify || !currentUser) {
                return res.status(404).json({ message: "User not found" })
            }


            // Check if the user is already followed
            // If already followed, then unFollow the user
            // -- remove/pull the id from the following array of the currentUser
            // -- and remove/pull the id from the followers array of the userToModify
            // Otherwise follow the user
            // -- add/push the id to the following array of the currentUser
            // -- and add/push the id to the followers array of the userToModify

            const isAlreadyFollowing = currentUser.following.includes(id)
            const operation = isAlreadyFollowing? '$pull' : '$push'

            // perform the update operation in parallel to reduce overall execution time
            await Promise.all([
                User.findByIdAndUpdate(
                    {_id: req.user._id},
                    {[operation]: { following: id }},
                    {session}
                ),

                User.findByIdAndUpdate(
                    {_id: id},
                    {[operation]: { followers: req.user._id }},
                    {session}
                )
            ])


            // Commit the transaction when all operations are successful
            await session.commitTransaction()

            res.status(200).json({ message: `User ${isAlreadyFollowing? 'unfollowed' : 'followed'} successfully` })



        } catch (err) {
            // Rollback the transaction if any error occurs
            await session.abortTransaction()
            throw err
        } finally {
            // End the session
            session.endSession()
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