const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    photo: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    parol: {
        type: String,
        required: true
    }
    , institut:{
        type: mongoose.Schema.ObjectId,
        ref: "institut",
        required: true
    },
    guruh:{
        type: mongoose.Schema.ObjectId,
        ref: "guruh",
        required: true
    }
},  
    {
        timestamps: true
    })
module.exports = mongoose.model("user", userSchema)