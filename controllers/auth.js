const {User} = require('../models')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken') 
const generateCode = require('../utils/genrateVerifCode')
const sendCodeToEmail = require('../utils/sendEmailCode')
const SignUp =async (req,res,next)=>{
    try {
        const {name,email,password,role} = req.body
        const isUserExis = await User.findOne({email})
        if(isUserExis){
            res.code = 400
            throw new Error("Email ተይዟል ሌላ ሞክር ጀለስ 😁 ")
        }
        const hashedPassword = await bcrypt.hash(password,10) //እዚች ጋር ደሞ passworduan እንቀምራተስኪ 😁
        const newUser = new User({name,email,password:hashedPassword,role})
        await newUser.save()
        res.status(201).json({code:201,status:true,message:"User signed up successfully"})
        console.log("User signedUp")
    } catch (error) {
        // console.log(error) //በስንት መከራ ያገኘሁት bug ነው
        next(error)
    }
}
const signIn = async (req,res,next)=>{
    try {
        const {email,password} = req.body
        console.log("working")
        const user = await User.findOne({email})
        if(!user){
            res.code = 401
            throw new Error("Invalid credentioals")
        }
        if(user && await bcrypt.compare(password,user.password)){
            const token = generateToken(user)
            res.status(200).json({code:200,status:true,message:"User signed in successfully",data:{token}})
        }else{
            res.code = 401
            throw new Error("Invalid credentioals")
        }
    } catch (error) {
        next(error)
    }
}
const verifyEmail = async(req,res,next)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.code = 404
            throw new Error("User not Found!") //የውሸት email እያስገቡ እንዳይረብሹን ነው እሽ በያ 👌
        }
        if(user.isVerified){
            res.code=400
            throw new Error("You Emil is already verified!")
        }
        if(!user.isVerified){
            const code = generateCode(6)
            // user.verificationCode = code
            // user.isVerified = true
            // await user.save()
            await sendCodeToEmail({
                emailTo:user.email,
                code,
                subject:"Email verification",
                content:"verify you email"
            })
            res.status(200).json({code:200,status:true,message:"email verification code sent succesfully!"})
        }

        else{
            throw new Error("Internal Server Error መሰለኝ የተፈጠረው በያ እስኪ DM me ")
        }

    } catch (error) {
        next(error)
    }
}
module.exports = {SignUp,signIn,verifyEmail}