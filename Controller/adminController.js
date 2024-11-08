const Admin = require('../Models/admin')
const bcrypt = require('bcrypt')
const institut = require('../Models/institut')
const mongoose = require("mongoose")
const Vazirlik = require('../Models/vazirlik')
const User = require('../Models/User')
const institutAdmin = require('../Models/institutAdmin')
const admin = {

    createAdmin: async (req, res) => {
        const { login, superAdmin, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const admin = new Admin({
            login, superAdmin, password: passwordHash
        })

        await admin.save()
            .then(data => res.redirect("/"))
            .catch(err => res.send(err))
    },
    login: async (req, res) => {
        const user = await Admin.findOne({ login: req.body.login })
        const otmadmin = await institutAdmin.findOne({ login: req.body.login });
        const vazirlik = await Vazirlik.findOne({ login: req.body.login })
        const studentLogin = await User.findOne({ login: req.body.login })

        console.log(req.body.password);


        if (user) {

            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                console.log('errpr');
            } else {

                res.cookie("userData", user, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.redirect('/')
            }
        } else if (otmadmin) {
            if (req.body.password == otmadmin.password) {
                res.cookie("otmData", otmadmin, { maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.redirect('/books')
            } else (console.log('otm admin err'))
        } else if (vazirlik) {
            if (req.body.password == vazirlik.password) {
                res.cookie("vazirlikdata", vazirlik, { maxAge: 1000 * 60 * 60 * 24 * 7 });

                res.redirect('/vazirlik')
            } else (console.log('err'))
        }
        else if (studentLogin) {
            if (req.body.password == studentLogin.parol) {
                res.cookie("studentdata", studentLogin, { maxAge: 1000 * 60 * 60 * 24 * 7 });

                res.redirect('/students')
            } else (console.log('err'))
        }
        else { res.send("login yoki parol xato") }

    },
    loginpage: async (req, res) => {
        let user = req.cookies.userData
        let otmadmincookie = req.cookies.otmData
        let vazirlikcookie = req.cookies.vazirlikdata;
        let studentcookie = req.cookies.studentdata
        if (user) {
            res.redirect("/error")
        } else if (otmadmincookie) {
            res.redirect("/error")
        } else if (vazirlikcookie) {
            res.redirect("/error")
        }else if (studentcookie) {
            res.redirect("/error")
        }
        else {
            res.render('admin/login', {
                layout: false,

            })
        }

    },
    addAdminPage: async (req, res) => {
        res.render('admin/add_admin', {
            layout: "./layout/main_admin_layout"

        })
    },
    deleteAdmin: async (req, res) => {
        await Admin.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/"))
            .catch(err => res.send(err))
    },
    adminLogout: async (req, res) => {
        let user = req.cookies.userData;
        let otmadmincookie = req.cookies.otmData;
        let vazirlikcookie = req.cookies.vazirlikdata;
        let studentcookie = req.cookies.studentdata
        if (user) {
            res.clearCookie("userData").redirect("/login")
            res.end()

        } else if (otmadmincookie) {

            res.clearCookie("otmData").redirect("/login")
            res.end()

        } else if (vazirlikcookie) {

            res.clearCookie("vazirlikdata").redirect("/login")
            res.end()

        }
        else if (studentcookie) {

            res.clearCookie("studentdata").redirect("/login")
            res.end()

        }
         else (
           res.redirect("/login")
        )



    }
}

module.exports = admin