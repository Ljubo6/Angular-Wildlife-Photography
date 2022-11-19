const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req,res){
    const candidate = await User.findOne({
        email: req.body.email.toLowerCase()
    })
    if (candidate){
        //Check password,user exist
        const passwordResult = bcrypt.compareSync(req.body.password,candidate.password)
        if(passwordResult){
            //Generate token,passwords confirmed
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            },keys.jwt,{expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`,
                message:'Login success'
            })
        }else{
            //Passwords didn't match
            res.status(401).json({
                message:'Passwords don\'t match.Try again.'
            })
        }
    }else{
        //User does not exist,error
        res.status(404).json({
            message:'User with this email was not found.'
        })
    }
}

module.exports.register = async function (req,res) {
    //firstName lastName email password
    const candidate = await User.findOne({email:req.body.email})
    if (candidate){
        //User exist, have to throw error
        res.status(409).json({
            message:'This email is already used.Take another one.'
        })
    }else{
        //Have to create user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            password: bcrypt.hashSync(password,salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch (e) {
            //Handle error
            errorHandler(res,e)
        }


    }
}