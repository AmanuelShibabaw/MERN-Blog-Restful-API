const {User} = require('../models')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken') 
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
module.exports = {SignUp,signIn}