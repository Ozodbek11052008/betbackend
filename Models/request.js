const mongoose = require('mongoose')
const requestSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
        trim: true,
        minlength: 1
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "books",
        required: true,
        trim: true,
        minlength: 1
    },
    statusreq: {
        type: String
    },
    institut: {
        type: mongoose.Schema.ObjectId,
        ref: "institut",
        required: true
    },

},
    {
        timestamps: true
    })
module.exports = mongoose.model("request", requestSchema)