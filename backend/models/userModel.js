const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    }, 

    // username: {
    //     type: String,
    //     unique: true,
    //     maxLength: 30,
    // },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    profilePic: {
        type: String,
        default: ""
    },

    followers: {
        type: [String],
        default: []
    },

    following: {
        type: [String],
        default: []
    },
    
    bio: {
        type: String,
        default: "",
        maxLength: 400
    }

}, {timestamps: true})




const User = mongoose.model('User', userSchema)

module.exports = User