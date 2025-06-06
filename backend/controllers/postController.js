const User = require("../models/userModel.js")
const Post = require("../models/postModel.js")




const createPost = async (req, res) => {
    try {
        
        const { postedBy, text } = req.body
        let { extra, img } = req.body

        if (!postedBy || !text) {
            return res.status(400).json({ error: "PostedBy and text fields are required" })
        }

        
        // check if the user exists
        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }


        // user cannot create a post of another user
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to create this post" })
        }

        
        // now create the post
        const newPost = new Post({
            postedBy,
            text,
            extra,
            img
        })

        // save the post to the database
        const savedPost = await newPost.save()

        // populate the postedBy field and replies.userId field
        const populatedPost = await Post.findById(savedPost._id)
                        .populate("postedBy", "_id name username profilePic")



        // send a response
        res.status(201).json(populatedPost)






    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from createPost controller: ", err.message)
    }
}



const getPost = async (req, res) => {
    try {
        
        const postId = req.params.id

        // check if the post exists
        const post = await Post.findById(postId)
                    .populate("postedBy", "_id name username profilePic")
                                
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }


        // send a response
        res.status(200).json(post)

    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getPost controller: ", err.message)
    }
}




const deletePost = async (req, res) => {
    try {

        const postId = req.params.id

        // check if the post exists
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        // check if the user is authorized to delete the post (cannot delete another user's post)
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "You are not authorized to delete this post" })
        }

        // everything is fine, now delete the post
        await Post.findByIdAndDelete(postId)

        // send a response
        res.status(200).json({ message: "Post deleted successfully" })

        
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from deletePost controller: ", err.message)
        
    }
}






const likeUnlikePost = async (req, res) => {


    try {

        const postId = req.params.id

        // check if the post exists
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }



        // check if the user has already liked the post
        const alreadyLikedThePost = post.likes.includes(req.user._id)


        // if the user has already liked the post, then unlike the post, otherwise like the post
        if (alreadyLikedThePost) {
            // unlike the post
            await Post.updateOne(
                {_id: postId},
                { $pull: { likes: req.user._id } }
            )

            res.status(200).json({ message: "Post unLiked successfully" })

        } else {
            // like the post
            await Post.updateOne(
                {_id: postId},
                { $addToSet: { likes: req.user._id } }
            )

            res.status(200).json({ message: "Post Liked successfully" })
        }



        
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error from likeUnlikePost controller: ", error.message)
    }


}




const replyToPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const name = req.user.name;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ error: "Text field is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const reply = {
            userId,
            text,
            userProfilePic,
            name,
            username
        };

        // Add the reply to the post
        post.replies.push(reply);
        await post.save();

        // Get the last reply (which is the one we just added) with its generated _id
        const savedReply = post.replies[post.replies.length - 1];

        // Send back the complete reply with _id
        res.status(201).json(savedReply);

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error from replyToPost controller: ", err.message);
    }
};




const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const postId = req.body.postId;

        console.log("🛠 Backend: Received postId:", postId);
        console.log("🛠 Backend: Received commentId:", commentId);

        // 1. Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            console.log("❌ Post not found");
            return res.status(404).json({ error: "Post not found" });
        }

        // 2. Log all replies for debugging
        console.log("🗂 All replies in the post:");
        post.replies.forEach((r, i) => {
            console.log(`↳ Reply ${i}: _id = ${r._id?.toString()}, userId = ${r.userId?.toString()}`);
        });

        // 3. Try to find the comment index manually
        const commentIndex = post.replies.findIndex(reply => {
            return reply._id?.toString() === commentId;
        });

        if (commentIndex === -1) {
            console.log("❌ Comment not found by ID match");
            return res.status(404).json({ error: "Comment not found" });
        }

        const comment = post.replies[commentIndex];

        // 4. Check if the user is authorized to delete the comment
        if (comment.userId.toString() !== req.user._id.toString()) {
            console.log("🚫 Unauthorized deletion attempt by:", req.user._id);
            return res.status(401).json({ error: "You are not authorized to delete this comment" });
        }

        // 5. Delete the comment
        post.replies.splice(commentIndex, 1);

        // 6. Save updated post
        await post.save();

        // 7. Respond
        console.log("✅ Comment deleted successfully");
        return res.status(200).json({
            message: "Comment deleted successfully",
            replies: post.replies
        });

    } catch (err) {
        console.log("Error in deleteComment controller:", err.message);
        return res.status(500).json({ error: "Server error: " + err.message });
    }
};

  






// get the posts of the people who the user is following

const getFeedPosts = async (req, res) => {
    try {

        const userId = req.user._id   // coming from the protectRoute middleware as payload in the req

        // check if the user exists or logged in
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }


        // get the posts of the people who the user is following
        const following = user.following

        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })
                                    .populate("postedBy", "_id name username profilePic")
                                    .populate("replies.userId", "_id name username profilePic")

        // send a response
        res.status(200).json(feedPosts)



    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getFeedPosts controller: ", err.message)
    }
}




// get all posts

const getAllPosts = async (req, res) => {
    try {

        const allPosts = await Post.find().sort({ createdAt: -1 })
                                    .populate("postedBy", "_id name username profilePic")
                                    .populate("replies.userId", "_id name username profilePic")

        // send a response
        res.status(200).json(allPosts)

    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getAllPosts controller: ", err.message)
    }
}



// get all the posts which are tagged with asma (text have #asma or #Asma or #ASMA  or #আসমা #আছমা in it ) 

const getAsmaulHusnaPosts = async (req, res) => {
    try {

        const posts = await Post.find({
            text: {
                $regex: /#আসমা|#আছমা|#asma|#Asma|#ASMA/i
            }
        }).sort({ createdAt: -1 })
          .populate("postedBy", "_id name username profilePic")
          .populate("replies.userId", "_id name username profilePic")

        // send a response
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getAsmaulHusnaPosts controller: ", err.message)
    }
}



const getUserPosts = async (req, res) => {
    try {

        const username = req.params.username

        // check if the user exists
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // get the posts of the user
        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 })
                                .populate("postedBy", "_id name username profilePic")
                                .populate("replies.userId", "_id name username profilePic")


        // send a response
        res.status(200).json(posts)
        
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.log("Error from getUserPosts controller: ", err.message)
    }
}





// export the functions
module.exports = {
    createPost,
    getPost,
    deletePost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getAllPosts,
    getUserPosts,
    deleteComment,
    getAsmaulHusnaPosts,
}