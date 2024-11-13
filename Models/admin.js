const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        minlength: 4
    },
  
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("adminModel", adminSchema)