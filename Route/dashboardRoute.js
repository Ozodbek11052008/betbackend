const { dashboard} = require("../Controller/dashboard")


const router = require("express").Router()


const auth = function (req, res, next) {
    let user = req.cookies.userData
    if (user) {
        console.log(user);
        next()

    } else if (!user) {
        res.redirect("/login/")
    }
}
router.get('/',   dashboard)

module.exports = router