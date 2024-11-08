const { deleteRequest, createRequest, getRequest, allowRequest, getRequestBookCHeck } = require("../Controller/requestController")

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


router.delete('/request/delete/:id',auth, deleteRequest)
router.post("/request/create", createRequest)
router.get('/allow/:id', allowRequest)
router.get('/taken/book/:id', getRequestBookCHeck)
router.get("/requests",auth, getRequest)
module.exports = router