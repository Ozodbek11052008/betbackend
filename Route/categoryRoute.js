const { deleteCategory, createCategory, categoryUpdate, getCategory, createCategoryPage, updateCategoryPage } = require("../Controller/categoryController")

const router = require("express").Router()

const auth = function (req, res, next) {
    let otmadmin = req.cookies.otmData
    if (otmadmin) {
        console.log(otmadmin);
        next()

    } else if (!otmadmin) {
        res.redirect("/login")
    }
}


router.delete('/category/delete/:id', auth, deleteCategory)
router.post("/create/category", createCategory)
router.put('/category/update/:id',auth, categoryUpdate)
router.get("/category",auth, getCategory)
router.get('/create/category/', auth, createCategoryPage )
router.get('/edit/category/:id', auth, updateCategoryPage)
module.exports = router