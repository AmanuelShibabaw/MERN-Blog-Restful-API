const {check,param} = require('express-validator')
const mongoose = require('mongoose')
const addingCatagoryValidator = [
    check('title').notEmpty().withMessage('catagory title is required')
]
const validateId = [
    param('id').custom(async (id)=>{
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid catagory id")
        }
    })
]

module.exports = {addingCatagoryValidator,validateId} 