const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getUser = async function(req,res){
    try{
        const user = await User.findById(req.user.id).populate('posts')

        res.status(200).json(user)
    }catch (e) {
        errorHandler(res,e)
    }
}