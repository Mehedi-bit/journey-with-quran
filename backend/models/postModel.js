const mongoose = require('mongoose')
const User = require('./userModel')



const postSchema = mongoose.Schema({
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },

    text: {
        type: String,
    },

    extra: {
        type: String,
        default: ''
    },

    img: {
        type: String,
        default: ''
    },

    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: User,
        default: []
    },

    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User,
                required: true
            },

            text: {
                type: String,
                required: true
            },

            userProfilePic: {
                type: String
            },

            username: {
                type: String
            },

            name: {
                type: String 
            }
        }
    ]


}, {timestamps: true})



const Post = mongoose.model('Post', postSchema)

module.exports = Post