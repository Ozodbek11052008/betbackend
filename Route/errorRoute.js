
const {page404} = require("../Controller/page404")


const router = require("express").Router()

router.get('/error', page404)


module.exports = router