const express = require('express')
const {catagoryController} = require('../controllers')
const router = express.Router()
const {addingCatagoryValidator} = require('../validator/catagoryInputsValidator')
const validate = require('../validator/validate')
const validateToken = require('../middleware/validateTokenAuth')
const isAdmin = require('../middleware/isAdmin')
router.post('/add-catagory',validateToken,isAdmin,addingCatagoryValidator,validate,catagoryController.addCatag)

module.exports = router
