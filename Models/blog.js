const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  

    description: {
        required: true,
        type: String,
    },
    url: {
        required: true,
        type: String
    },
  
   
    title: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("blog", blogSchema)