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
            user.verificationCode = code
            // user.isVerified = true
             await user.save()
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

    const verifyUser = async(req,res,next)=>{

        try {
             const {email,code} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.code = 404
            throw new Error("Invalid Credentials")
        } 
        if(user.isVerified){
            res.code = 400
            throw new Error("You are already verified")
        }
        if(user && user.verificationCode===code){
            user.isVerified = true
            user.verificationCode = null
            await user.save()
            res.status(200).json({status:true,message:"peace በቃ ብሮ verified hunehal!"})
        }
        if(user.verificationCode!=code){
            res.code = 400
            throw new Error("Invalid Code !")
        }
        else{
            res.code = 500
            throw new Error("Unkown Eror Occured")
        }
        } catch (error) {
            next(error)
        }
       
    }
    const ForgetPass = async(req,res,next)=>{
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user){
                res.code = 404
            throw new Error("Invalid Credentials  | user not found ")
            }
            const code = generateCode(6)
            user.fogetPassCode = code
            await user.save()
            await sendCodeToEmail({
                emailTo:user.email,
                code,
                subject:"Forgeted Password recovering",
                content:"Change your password"
            })
            res.status(200).json({status:true,message:"forget pssword code sent to your email please checktout"})

        } catch (error) {
            next(error)
        }
    }
    const recoverPassword = async(req,res,next)=>{
        try {
            const {email,code,password}= req.body
            const user = await User.findOne({email})
             if(!user){
                res.code = 404
            throw new Error("Invalid Credentials  | user not found ")
            }
            if(user.fogetPassCode===code){
                const hashedPassword =await bcrypt.hash(password,10)
                user.password = hashedPassword
                user.forgetPassCode = null
                await user.save()
                res.status(200).json({code:200,status:true,message:"Paswoerd changed succesfully !"})
            }
            else{
                res.code = 400
                throw new Error("Invalid code Used")
            }
        } catch (error) {
            next(error)
        }
    }

    const changePass = async(req,res,next)=>{
        try {
            const {oldpass,newpass} = req.body
            const user = await User.findOne({email:req.user.email})
            const match = await bcrypt.compare(oldpass,user.password)
            if(!match){
                res.code = 400
                throw new Error("Invalid Credentials!")
            }
            if(match){
                if(!user){
                    res.code =400
                    throw new Error("User no found")
                }
                user.password = await bcrypt.hash(newpass,10)
                await user.save()
                res.status(200).json({ok:true,message:"passwoed ተቀይሯል",data:req.user})
            }

           
        } catch (error) {
            next(error)
        }
    }
module.exports = {SignUp,signIn,verifyEmail,verifyUser,ForgetPass,recoverPassword,changePass}