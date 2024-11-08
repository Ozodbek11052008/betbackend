const AppModdel = require("../Models/app")

const App = {

    createApp: async (req, res) => {
        const { name, language, downloadUrl } = req.body;

        console.log(req.body);
        const AppDB = new AppModdel({
            name, language, downloadUrl, photo: req.file.filename
        })
        await AppDB.save()
            .then(data => res.redirect("/Apps"))
            .catch(err => res.send(err))
    },
    getApp: async (req, res) => {


        const App = await AppModdel.find()
        res.render('admin/app', {
            layout: './layout/admin_layout',
            App
        })
    }
    ,
    deleteApp: async (req, res) => {
        await AppModdel.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/apps"))
            .catch(err => res.send(err))
    },
    getAddApp: async (req, res) => {



        res.render('admin/add_App', {
            layout: './layout/admin_layout',
        })
    },
    getAddApp: async (req, res) => {



        res.render('admin/add_App', {
            layout: './layout/admin_layout',
        })
    },  getAddLangApp: async (req, res) => {

  
        const { appId } = req.params.id;
       
      const appData  = await AppModdel.findById(req.params.id)
      const language  =  req.params.lang
     

    
        res.render('admin/add_Language', {
            layout: './layout/admin_layout',
            appId,
            appData,
            language
        })
    },
    getJsonApp: async (req, res) => {



        Appsjson = await AppModdel.find()
            .then(data => res.send(data))

    },
    // New route to get a single app by its ID
    // app.get('/json/apps/:id', async (req, res) => {
    //     try {
    //       const appId = req.params.id;
    //       const appData = await App.findById(appId);

    //       if (!appData) {
    //         return res.status(404).json({ message: 'App not found' });
    //       }

    //       res.json(appData);
    //     } catch (error) {
    //       res.status(500).json({ message: 'Server Error' });
    //     }
    //   });
    // getJsonSpecificId: async (req, res) => {
    //     try {
    //         const appId = req.params.id;
    //         const appData = await App.findOne(appId); // Corrected typo here
    //         console.log(req.params.id);

    //         if (!appData) {
    //             return res.status(404).json({ message: "App not found" });
    //         }

    //         res.json(appData);
    //     } catch (error) {
    //         console.log(error)
    //         console.error("Error in fetching app data:", error); // Log the error for debugging
    //         res.status(500).json({ message: "Server Error" });
    //     }
    // }

}

module.exports = App