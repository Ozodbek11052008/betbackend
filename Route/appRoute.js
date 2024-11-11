
const router = require("express").Router()
const multer = require('multer')
// const upload = multer({
//     dest:"public/uploads"
// })
const md5 = require('md5')
const path = require('path')
const appController = require('../Controller/laguageController');
const { createApp, getJsonApp, getApp, deleteApp, getAddApp, getJsonSpecificId, getAddLangApp } = require("../Controller/appController")
const store = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'Public/Uploads/')
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, md5(Date.now()) + ext)
    }
})

const upload = multer({
    storage: store
})



const auth = function (req, res, next) {
    let user = req.cookies.userData
    if (user) {
        console.log(user);
        next()

    } else if (!user) {
        res.redirect("/login")
    }
}


router.post("/create/app", upload.single('photo'), auth, createApp)
router.get("/json/apps", getJsonApp)
router.delete("/delete/app/:id", deleteApp)
router.get('/apps', auth, getApp)
router.get("/create/contora", auth, getAddApp)
router.post('/app/:appId/language', auth, appController.addTranslation);
router.get('/app/:appId', appController.getAppWithTranslations);
router.get('/app/lang/:lang/:id', getAddLangApp)
// router.get("/json/apps/:id", getJsonSpecificId)

module.exports = router