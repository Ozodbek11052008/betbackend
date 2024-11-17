const App = require("../Models/app")
const Language =   require("../Models/language")
// Add a language translation to an app
exports.addTranslation = async (req, res) => {
    try {
      const { appId } = req.params;
      const { languageCode, description, appNameTranslation } = req.body;
  
      // Find the app by ID
      const app = await App.findById(appId);
      if (!app) {
        return res.status(404).json({ message: 'App not found' });
      }
  
      // Create a new language translation
      const translation = new Language({
        app: appId,
        languageCode,
        description,
        appNameTranslation
      });
      await translation.save();
  
      // Add the translation to the app's languages array
      app.languages.push(translation._id);
      await app.save();
  
      res.redirect('/apps')
    } catch (error) {
      res.status(500).json({ message: 'Error adding translation', error });
    }
  };
  
// Get an app with all translations by name
exports.getAppWithTranslations = async (req, res) => {
  try {
    const { appName } = req.params;

    // Find the app by name and populate translations
    const app = await App.findOne({ name: appName }).populate('languages');
    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }

    res.status(200).json({ app });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving app', error });
  }
};// Get an app with all translations by name
exports.getAppWithTranslations = async (req, res) => {
  try {
    const { appName } = req.params;

    // Find the app by name and populate translations
    const app = await App.findOne({ name: appName }).populate('languages');
    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }

    res.status(200).json({ app });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving app', error });
  }
};