const mongoose = require('mongoose')
const navbatSchema = mongoose.Schema({
    service: {
        type: String,
        trim: true,
        minlength: 5,
        required: true
    },

    time: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },

    doctor: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false, // Set default status to false
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("navbat", navbatSchema)