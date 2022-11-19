const express = require('express')
const controller = require('../controllers/profileController')
const passport = require("passport");
const router = express.Router()

router.get('/',passport.authenticate('jwt',{session: false}),controller.getPostsByAuthorId)

module.exports = router