
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
        cb(null, 'public/Uploads/')
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, md5(Date.now()) + ext)
    }
})

const upload = multer({
    storage: store
})






router.post("/create/app", upload.single('photo') ,createApp)
router.get("/json/apps",  getJsonApp)
router.delete("/delete/app/:id", deleteApp)
router.get('/apps',  getApp)
router.get("/create/contora", getAddApp)
router.post('/app/:appId/language', appController.addTranslation);
router.get('/app/:appId', appController.getAppWithTranslations);
router.get('/app/lang/:lang/:id', getAddLangApp)
// router.get("/json/apps/:id", getJsonSpecificId)

module.exports = router