const {check} = require('express-validator')

const addingCatagoryValidator = [
    check('title').notEmpty().withMessage('catagory title is required')
]


module.exports = {addingCatagoryValidator} 