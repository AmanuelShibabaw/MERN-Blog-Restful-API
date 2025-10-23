const express = require('express')
const {authController} = require('../controllers')
const router = express.Router()
const {validateSignUp,validateSignIn,verificationValidator, CodeValidator, emailValidator, recoverPassValidator} = require('../validator/auth') 

const validate = require('../validator/validate')
const { recoverPassword } = require('../controllers/auth')
router.post('/signup',validateSignUp,validate,authController.SignUp)
router.post('/signin',validateSignIn,validate,authController.signIn)
router.post('/verify-email',verificationValidator,validate,authController.verifyEmail)
router.post('/verify-user',CodeValidator,validate,authController.verifyUser)
router.post('/forget-pass',emailValidator,validate,authController.ForgetPass)
router.post('/recover-pass',recoverPassValidator,validate,recoverPassword)
module.exports = router