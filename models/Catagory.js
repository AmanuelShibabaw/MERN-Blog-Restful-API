const mongoose = require('mongoose')

const catagorySchema = mongoose.Schema({
    title:{type: String, required:true},
    desc:String,
    modifiedBy:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{timestamps:true});

module.exports = mongoose.model("catagory",catagorySchema)