const express = require('express')
const connectDB = require('./config/db')
const app = express()
const PORT = 5000 || process.env.PORT
const router = express.Router();
const path = require('path')
const cors = require('cors')
const mongoose = require("mongoose")
connectDB()


const App = require("./Models/app")

const Layout = require('express-ejs-layouts')
require('ejs')

const methodOverride = require('method-override')
const blog = require('./Models/blog');
const navbat = require('./Models/navbat');
app.use(methodOverride('_method', {
  methods: ["POST", "GET"]
}))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(Layout)


app.use('/assets', express.static(path.join(__dirname, 'Public/assets')))
app.use('/plugins', express.static(path.join(__dirname, 'Public/plugins')))
app.use('/Uploads', express.static(path.join(__dirname, 'Public/Uploads')))

// Route to Get App Info by Name
app.get('/app/info/:name', async (req, res) => {
  try {
    const appName = decodeURIComponent(req.params.name); // Decode name
      const appData = await App.findOne({ name: appName });

      if (appData) {
          res.json(appData); // Return the app data as JSON
      } else {
          res.status(404).json({ error: 'App not found' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use(cors({
  origin: 'https://https888starz-uz.com/' // Replace with your front-end's origin
}));

app.use(express.json(), express.urlencoded({ extended: true }))
// for read json 
console.log(__dirname);
// app.use(require('./Route/booksRoute'))
// app.use(require('./Route/categoryRoute'))
// app.use(require("./Route/institutRoute"))
// app.use(require('./Route/userRoute'))
// app.use(require('./Route/dashboardRoute'))
// app.use(require('./Rsoute/requestRoute'))
// app.use(require('./Route/guruhRoute'))
// app.use(require("./Route/otmdashboard"))
// app.use(require('./Route/adminRoute'))
// app.use(require("./Route/vazirlikRoute"))
// app.use(require("./Route/errorRoute"))
// app.use(require('./Route/institutAdminRoute'))

let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({
  origin: ['https://888starz-uz.netlify.app/'] // Allow Netlify domain
}));
// Function to calculate the time difference in hours
const getHoursDifference = (date1, date2) => {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
};

app.use(require('./Route/adminRoute'))
app.use(require("./Route/appRoute"))
// app.use(require('./Route/messageRoute'))
// app.use((require("./Route/dashboardRoute")))
// app.use((require("./Route/blogRoute")))

app.get('/json/apps/:id', async (req, res) => {
  try {
    const appId = mongoose.Types.ObjectId(req.params.id); // Ensure it's an ObjectId
    const appData = await App.findById(appId);

    if (!appData) {
      return res.status(404).json({ message: 'App not found' });
    }

    res.json(appData);
  } catch (error) {
    console.error("Error in fetching app data:", error); // Log the error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Sever is running at ${PORT} port`)
})
