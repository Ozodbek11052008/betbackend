const Request = require("../Models/request")
const mongoose = require("mongoose")
const request = {

    createRequest: async (req, res) => {
        const { user, book, institut } = req.body
        const requestdb = new Request({
            user, statusreq: false, book, institut
        })
        await requestdb.save()
            .then(data => res.redirect("/requests"))
            .catch(err => res.send(err))
    },
    getRequest: async (req, res) => {
        const otmadmin = req.cookies.otmData;

        const request = await Request.find({ institut: mongoose.Types.ObjectId(otmadmin.institut) }).sort({ createdAt: -1 }).populate(['user', 'book'])


        res.render('admin/request', {
            layout: './layout/admin_layout',
            request
        })
    }
    ,

    deleteRequest: async (req, res) => {
        await Request.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/requests"))
            .catch(err => res.send(err))
    },

    allowRequest: async (req, res) => {
        const testdata = await Request.findById(req.params.id);
        console.log(testdata);
        function deleteRequest() {
            setTimeout(async () => {
                if (testdata.statusreq == 'takenbook') {


                    console.log('taken');
                } else { console.log('not taken'); }
            }, 5000);
        }
        setTimeout(() => {
             deleteRequest()
        }, 3000);
       
        await Request.findByIdAndUpdate(req.params.id, {
            statusreq: "true"
        })
            .then(data => {
                res.redirect("/requests")
            })
            .catch(err => res.send(err))
    },
    getRequestBookCHeck: async (req, res) => {
        await Request.findByIdAndUpdate(req.params.id, {
            statusreq: "takenbook"
        })
            .then(data => {
                res.redirect("/requests")
            })
            .catch(err => res.send(err))
    }



}

module.exports = request