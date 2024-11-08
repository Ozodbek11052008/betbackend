const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    downloadUrl: {
        type: String,
        required: true
    },
    photo: {
        required: true,
        type: String
    },

    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('App', AppSchema);
