
const router = require("express").Router()
const multer = require('multer')
// const upload = multer({
//     dest:"public/uploads"
// })
const md5 = require('md5')
const path = require('path')

const { createBlog, getBlog, deleteBlog, getAddBlog, getJsonBlog } = require("../Controller/blogController")
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






router.delete('/blog/delete/:id', deleteBlog)
router.get('/blogs', getBlog)
router.post("/create/blog", createBlog)
router.get('/create/blog', getAddBlog)
router.get('/blogs/json', getJsonBlog)
module.exports = router