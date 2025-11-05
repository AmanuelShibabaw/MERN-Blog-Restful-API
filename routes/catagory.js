const express = require('express')
const {catagoryController} = require('../controllers')
const router = express.Router()
const {addingCatagoryValidator} = require('../validator/catagoryInputsValidator')
const validate = require('../validator/validate')
const validateToken = require('../middleware/validateTokenAuth')
router.post('/add-catagory',validateToken,addingCatagoryValidator,validate,catagoryController.addCatag)

module.exports = router
