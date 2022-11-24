const Post = require('../models/Post')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllPosts = async function(req,res){
    try{
        const posts = await Post.find({}).populate('author').populate('votes').lean()
        res.status(200).json(posts)
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.getPostById = async function(req,res){
    try{
        const post = await Post.findById(req.params.id).populate('author').populate('votes').lean()
        res.status(200).json(post)
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.createPost = async function(req,res){
    const post = await  new Post({
        title: req.body.title.trim(),
        keyword: req.body.keyword.trim(),
        location: req.body.location.trim(),
        date: req.body.date.trim(),
        imageUrl: req.body.imageUrl.trim(),
        description: req.body.description.trim(),
        author: req.user.id
    })
    try{

        const user = await User.findById(post.author._id)
        user.posts.push(post)
        await post.save()
        await user.save()
        res.status(201).json([post,user])
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.editPost = async function(req,res){
    const updated = {
        title: req.body.title.trim(),
        keyword: req.body.keyword.trim(),
        location: req.body.location.trim(),
        date: req.body.date.trim(),
        imageUrl: req.body.imageUrl.trim(),
        description: req.body.description.trim()
    }
    try{
       const post = await Post.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new:true}
        )
        res.status(200).json(post)
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.deletePost = async function(req,res){
    try{
        console.log(req.params.id)
        await Post.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Тhe post has been deleted.'
        })
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.detailsPost = async function(req,res){
    try{

        const post = await Post.findById(req.params.id).populate('author').populate('votes').lean()
        console.log('Id:',req.user.id)
        console.log('authorId:',post.author._id)
        post.hasUser = Boolean(req.user)
        post.isAuthor =  req.user && req.user.id == post.author._id
        post.isVoted = !!post.votes.find(v =>  v._id == req.user.id)
        post.peopleVoted = post.votes.map(x => x.email).join(' ')


        res.status(200).json(post)
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.detailsGuestPost = async function(req,res){
    try{

        const post = await Post.findById(req.params.id).populate('author').populate('votes').lean()

        res.status(200).json(post)
    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.dislikePost = async function(req,res){
    try{
        const postId = req.params.id
        const userId = req.user.id
        const post = await Post.findById(postId).populate('author')

        post.votes.push(userId)
        post.rating--
        await post.save()
        res.status(200).json({post})

    }catch (e) {
        errorHandler(res,e)
    }
}
module.exports.likePost = async function(req,res){
    try{
        const postId = req.params.id
        const post = await Post.findById(postId).populate('author')

        const userId = req.user.id

        post.votes.push(userId)
        post.rating++
        await post.save()
        res.status(200).json({post})
    }catch (e) {
        errorHandler(res,e)
    }
}

