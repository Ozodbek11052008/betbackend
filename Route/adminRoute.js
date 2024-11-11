const { createAdmin, login, loginpage, adminLogout } = require("../Controller/adminController")


const router = require("express").Router()


// const auth = function (req, res, next) {
//     let user = req.cookies.userData
//     if (user) {
        
//         next()

//     } else if (!user) {
//         res.redirect("/user/login")
//     }
// }



router.post("/create/admin", createAdmin)
router.post('/admin/login', login)
router.get('/login', loginpage)
router.get('/logout', adminLogout)
// router.post('/admin/login', login )
// router.get('/login', loginpage)
// router.get("/add/admin", addAdminPage)
// router.delete("/delete/admin/:id", deleteAdmin)

// router.get("/logout", adminLogout)
module.exports = router