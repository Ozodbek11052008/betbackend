const User = require("../Models/User")
const fs = require('fs')
const path = require('path')
const institut = require("../Models/institut")
const Books = require("../Models/books")

const users = {

    createUser: async (req, res) => {
        const { login, name, surname, parol , institut, guruh} = req.body
        const usersdb = new User({
            login, name, surname, parol, photo: req.file.filename, institut, guruh
        })
        await usersdb.save()
            .then(data => res.redirect("/students"))
            .catch(err => res.send(err))
    },
    deleteUser: async (req, res) => {
        
            const data = await User.findById(req.params.id)
            if (data.photo) {
                fs.unlink(path.join(__dirname.replace("Controller", "Public/Uploads/user/"), data.photo), (err) => {
                    if (err) {
                        throw err
                    }
                })
            }
            await User.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/students"))
            .catch(err => res.send(err))
         
    },
    userUpdate: async (req, res) => {
        console.log(req.body)
        await User.findByIdAndUpdate(req.params.id, {
            login: req.body.login,
            name: req.body.name,
            photo: req.file.filename,
            surname: req.body.surname,
            institut: req.body.institut,
            parol: req.body.parol,
            guruh:req.body.guruh
        })

            .then(data => {
                res.send(data)
            })
            .catch(err => res.send(err))
        const data = await User.findById(req.params.id)
        if (data.photo) {
            fs.unlink(path.join(__dirname.replace("Controller", "Public/Uploads/user/"), data.photo), (err) => {
                if (err) {
                    throw err
                }
            })
        }
    },
    getStudentPage: async (req, res) => {
        const otmadmin = req.cookies.otmData;
    

        const users = await User.find({institut:otmadmin.institut}).sort({ createdAt: -1 })
        res.render('admin/users', {
            layout: './layout/admin_layout',
            users,
            otmadmin
        })
    },
    getStudentFrontPage: async (req, res) => {
        const studentcookie  = req.cookies.studentdata;
        const books = await Books.find({institut:studentcookie.institut}).sort({createdAt:-1})
        res.render('frontend/booksdsd', {
            layout: './layout/frontend_layout',
            books,
            studentcookie
        })
 
    },
    getUserInfo: async (req, res) => {
     const studentcookie = req.cookies.studentdata;
     const userdata = await User.find({_id: studentcookie._id}).populate(['guruh', "institut"])
     res.render('frontend/userinfo', {
        layout: './layout/frontend_layout',
        userdata
    })
    // res.send(userdata)
    },
    getCreateUserPage: async (req, res) => {
        const institutdata = await institut.find({})
        res.render('admin/add_user', {
            layout: './layout/admin_layout',
            institutdata
        })
    },
    getUpdateUserPage: async (req, res) => {
        const data = await User.findById(req.params.id)
        res.render('admin/edit_user', {
            layout: './layout/admin_layout',
            data
        })
    }
}

module.exports = users