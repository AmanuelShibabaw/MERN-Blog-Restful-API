const {Catagory ,User} = require('../models')

const addCatag = async(req,res,next)=>{
    try {
        const {title,desc} = req.body
        const userId = req.user.id
        const CatagoryEXist = await Catagory.findOne({title})
        const user = await User.findById({_id:userId})
        if(!user){
            res.code = 400
            throw new Error("user not found")
        }
        if(CatagoryEXist){
            res.code = 400
            throw new Error("Catagory is exist noneed to create ሌላ ካታጎሪ ")
        }
        await Catagory.create({title,desc,modifiedBy:userId})
       
      res.status(201).json({code:201,status:true,message:"catagory በተሳካ ሁኔታ inserted ሁኗል!"})

    } catch (error) {
        next(error)
    }
}
const updateCatagory = async(req,res,next)=>{
    try {
        const {title,desc} = req.body
        const {id}= req.params
        const userId = req.user.id
        const catagoryexi = await Catagory.findById(id)
        const user = await User.findById({_id:userId})
        if(!user){
            res.code = 400
            throw new Error("user not found")
        }
        if(!catagoryexi){
            res.code = 400
            throw new Error("catagory not found")
        }
        catagoryexi.title = title || catagoryexi.title
        catagoryexi.desc = desc || catagoryexi.desc
        catagoryexi.modifiedBy = userId
        await catagoryexi.save()
        res.status(200).json({code:200,status:true,message:"catagory updated successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {addCatag,updateCatagory}