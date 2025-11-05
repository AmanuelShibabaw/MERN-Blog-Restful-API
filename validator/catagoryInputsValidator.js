const {check} = require('express-validator')

const addingCatagoryValidator = [
    check('title').notEmpty().withMessage('catagory title is required'),
    check('modifiedBy').notEmpty().withMessage('Id of modifier is important for me ገቢቶ ጀለሴ')
]


module.exports = {addingCatagoryValidator}