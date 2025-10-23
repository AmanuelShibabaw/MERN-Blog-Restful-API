const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    isVerified : {type: Boolean, default:false},
    verificationCode: String,
    fogetPassCode:String, //ድንገት password ብትረሳ እንዳትደነግጥ እሺ
    role:{type:Number,default:3}
},{timestamps:true})

const User = mongoose.model("user",UserSchema)

module.exports = User