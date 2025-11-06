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
        const formerCata = await Catagory.findOne({title});
        if(formerCata && String(formerCata._id) !== String(catagoryexi._id)){
            res.code = 400
            throw new Error("catagory title already teken")
        }
        catagoryexi.title = title || catagoryexi.title
        catagoryexi.desc = desc
        catagoryexi.modifiedBy = userId
        await catagoryexi.save()
        res.status(200).json({code:200,status:true,message:"catagory updated successfully",data:catagoryexi})
    } catch (error) {
        next(error)
    }
}
const deleteCatag = async(req,res,next)=>{
    try {
        const userId = req.user.id
        const {id} = req.params
        const userex = await User.findById({_id:userId})
        if(!userex){
            res.code = 400
            throw new Error("there is no user with such id")
        }
        const catagoryex = await Catagory.findById({_id:id})
        if(!catagoryex){
            res.code = 404
            throw new Error("Catagory not exist!!")
        }
        await Catagory.findByIdAndDelete({_id:id})
        res.status(200).json({code:200,status:true,message:"catagory deleted successfully"})
    } catch (error) {
        next(error)
    }
}

const searchingCatag = async (req,res,next)=>{
    try {
        const {q,size,page}= req.query
        let query = {}
        const sizeNumber =parseInt(size)
        const pageNumber = parseInt(page) || 1
        if(q){
            const search = RegExp(q,'i')
            query = {$or:[{title:search},{desc:search}]}
        }
        const total = await Catagory.countDocuments(query)
        const pages = Math.ceil(total/sizeNumber)
        const catagories = await Catagory.find(query).skip((pageNumber - 1) * sizeNumber).limit(sizeNumber).sort({modifiedBy:-1})
        if(catagories.length === 0){
            res.code = 404
            throw new Error("No catagory Found")
        }
        res.status(200).json({code:200,status:true,message:"catagories fetchedd successfully",
            data:{catagories,total,pages}})

    } catch (error) {
        next(error)
    }
}
const getSinglectagory = async (req,res,next)=>{
    try {
        const {id} = req.params
        const catagory = await Catagory.findById({_id:id})
        if(!catagory){
            res.code = 404
            throw new Error("catagory የለም ")
        }
        res.status(200).json({code:200,status:true,message:"catagory ተገኝቷል",data:{catagory}})
    } catch (error) {
        next(error)
    }
}
module.exports = {addCatag,updateCatagory,deleteCatag,searchingCatag,getSinglectagory}