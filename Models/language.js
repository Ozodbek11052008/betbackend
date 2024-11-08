const mongoose = require('mongoose');
const LanguageSchema = new mongoose.Schema({
    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'App',
      required: true
    },
    languageCode: {
      type: String, // e.g., 'ru' or 'uz'
      required: true
    },
    description: {
      type: String,
      required: true
    },
    appNameTranslation: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model('Language', LanguageSchema);
  