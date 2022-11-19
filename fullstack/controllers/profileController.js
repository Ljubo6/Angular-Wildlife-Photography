const Post = require('../models/Post')
const errorHandler = require('../utils/errorHandler')

module.exports.getPostsByAuthorId = async function(req,res){
    try{
        const posts = await Post.find({author:req.user.id}).populate('author').populate('votes').lean()
        res.status(200).json(posts)
    }catch (e) {
        errorHandler(res,e)
    }
}