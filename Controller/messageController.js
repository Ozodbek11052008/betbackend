const messageModel = require("../Models/message")

const message = {

    createMessage: async (req, res) => {
        const {  message, phone , name } = req.body;

        console.log(req.body);
        const messageDB = new messageModel({
           message, phone, name
        })
        await messageDB.save()
            .then(data => res.redirect("/"))
            .catch(err => res.send(err))
    },
    getmesage: async (req, res) => {
      

        const message = await messageModel.find()
        res.render('admin/message', {
            layout: './layout/admin_layout',
            message
        })
    }
    ,
    deletemesage: async (req, res) => {
        await messageModel.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/messages"))
            .catch(err => res.send(err))
    },
}

module.exports = message