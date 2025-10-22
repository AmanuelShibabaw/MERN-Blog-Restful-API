const express = require('express')
const {authController} = require('../controllers')
const router = express.Router()
const {validateSignUp,validateSignIn,verificationValidator} = require('../validator/auth') 
const validate = require('../validator/validate')
router.post('/signup',validateSignUp,validate,authController.SignUp)
router.post('/signin',validateSignIn,validate,authController.signIn)
router.post('/verify-email',verificationValidator,authController.verifyEmail)
module.exports = router