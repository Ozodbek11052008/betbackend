const mongoose = require('mongoose')
const messageSchema = mongoose.Schema({
  

    message: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number
    },
  
   
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("message", messageSchema)