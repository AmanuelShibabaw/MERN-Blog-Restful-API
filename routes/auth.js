const express = require('express')
const {authController} = require('../controllers')
const router = express.Router()
const {validateSignUp,validateSignIn} = require('../validator/auth') 
const validate = require('../validator/validate')
router.post('/signup',validateSignUp,validate,authController.SignUp)
router.post('/signin',validateSignIn,validate,authController.signIn)
module.exports = router