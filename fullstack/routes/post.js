const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/postController')
const router = express.Router()

router.get('/', controller.getAllPosts)
router.get('/:id',controller.getPostById)
router.post('/',passport.authenticate('jwt',{session: false}),upload.single('image'),controller.createPost)
router.delete('/:id',passport.authenticate('jwt',{session: false}),controller.deletePost)
router.patch('/:id',passport.authenticate('jwt',{session: false}),upload.single('image'),controller.editPost)
router.get('/details/:id',passport.authenticate('jwt',{session: false}),controller.detailsPost)
router.get('/detailsGuest/:id',controller.detailsGuestPost)
router.post('/like/:id',passport.authenticate('jwt',{session: false}),controller.likePost)
router.post('/dislike/:id',passport.authenticate('jwt',{session: false}),controller.dislikePost)



module.exports = router