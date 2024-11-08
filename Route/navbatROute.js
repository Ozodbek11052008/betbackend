
const router = require("express").Router()
const multer = require('multer')
// const upload = multer({
//     dest:"public/uploads"
// })
const md5 = require('md5')
const path = require('path')
const { deleteNavbat, getNavbat, createNavat, test, updateStatus, getFreshNavbat } = require("../Controller/navbatController")
const store = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/Uploads/books')
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, md5(Date.now()) + ext)
    }
})

const upload = multer({
    storage: store
})






router.delete('/navbat/delete/:id', deleteNavbat)
router.get('/navbat', getNavbat)
router.post("/create", createNavat);
router.get("/test", test);
router.get('/check/:id', updateStatus)
router.get('/freshdata', getFreshNavbat)
module.exports = router