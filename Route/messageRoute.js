
const router = require("express").Router()
const multer = require('multer')
// const upload = multer({
//     dest:"public/uploads"
// })
const md5 = require('md5')
const path = require('path')
const { deleteNavbat, getNavbat, createNavat } = require("../Controller/navbatController")
const { createMessage, getmesage, deletemesage } = require("../Controller/messageController")
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






router.delete('/message/delete/:id', deletemesage)
router.get('/messages', getmesage)
router.post("/message", createMessage)
module.exports = router