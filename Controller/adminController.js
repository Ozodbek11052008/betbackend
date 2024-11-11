const Admin = require('../Models/admin')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")

const admin = {

    createAdmin: async (req, res) => {


        const { login, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const admin = new Admin({
            login, password: passwordHash
        })

        await admin.save()
            .then(data => res.redirect("/apps"))
            .catch(err => res.send(err))
    },
    login: async (req, res) => {
        const user = await Admin.findOne({ login: req.body.login })


        console.log(req.body.password);


        if (user) {

            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                console.log('errpr');
            } else {

                res.cookie("userData", user, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.redirect('/apps')
            }
        }
        else { res.send("login yoki parol xato") }

    },
    loginpage: async (req, res) => {


        if (req.cookies.userData) {
            res.redirect("/apps")
        }
        else {
            res.render('admin/login', {
                layout: false,

            })
        }
    },
    adminLogout: async (req, res) => {
        let user = req.cookies.userData;
     
        if (user) {
            res.clearCookie("userData").redirect("/login")
            res.end()

        } 
         else (
           res.redirect("/login")
        )



    }
}

module.exports = admin