const express = require('express')
const controller = require('../controllers/userController')
const passport = require("passport");
const router = express.Router()

router.get('/',passport.authenticate('jwt',{session: false}), controller.getUser)

module.exports = router