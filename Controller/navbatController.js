const navbatModel = require("../Models/navbat")

const navbat = {

    createNavat: async (req, res) => {
        const { service, time, phone, doctor, name } = req.body
        const navbatDB = new navbatModel({
            service, time, phone, name, doctor
        })
        await navbatDB.save()
            .then(data => res.redirect("/"))
            .catch(err => res.send(err))
    },
    getNavbat: async (req, res) => {


        const navbat = await navbatModel.find();

        res.render('admin/category', {
            layout: './layout/admin_layout',
            navbat
        })
    }
    ,
    getFreshNavbat: async (req, res) => {

        // Service status logic
        const checkServiceStatus = (serviceDate) => {
            const today = new Date();
            const serviceDateObj = new Date(serviceDate);

            if (serviceDateObj < today) {
                return "None";  // Service was in the past
            } else if (serviceDateObj.toDateString() === today.toDateString()) {
                return `Scheduled for today at ${serviceDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            } else {
                return `Scheduled on ${serviceDateObj.toDateString()} at ${serviceDateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            }
        };

    }
    ,
    updateStatus: async (req, res) => {


        const navbat = await navbatModel.findByIdAndUpdate(req.params.id, { status: true },)
        res.redirect('/')
    },
    test: async (req, res) => {

let testBranch = 1;
        const navbat = await navbatModel.find()
        res.render('admin/timepeak', {
            layout: false,
            navbat
        })
    }
    ,
    deleteNavbat: async (req, res) => {
        await navbatModel.findByIdAndDelete(req.params.id)
            .then(data => res.redirect("/navbat"))
            .catch(err => res.send(err))
    },
}

module.exports = navbat