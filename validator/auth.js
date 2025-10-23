const {check} = require('express-validator');

const validateSignUp = [
    check('name')
        .notEmpty().withMessage('Name is required'),
    check('email')
        .isEmail().withMessage('Please provide a valid email address').notEmpty().withMessage('Email is required'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
const validateSignIn = [
    check('email')
        .isEmail().withMessage('Please provide a valid email address').notEmpty().withMessage('Email is required'),
    check('password')
        .isLength({ min: 6 }).withMessage('ምንሸ ነው በያ ያለ password ይሰራል እንዴ አ')
];
const verificationValidator = [
    check('email').isEmail().withMessage("ትክክለኛ Email ኣስገባ እንጂ በያ").notEmpty().withMessage("Email is ኣስፈላጊ ገቢቶ!")
]

const CodeValidator = [
    check('code').isJSON().withMessage("There  Is no Code በያ codun emailsh lay ሹፊው እና ከች በይ!"),
    check('email').isEmail().withMessage("ትክክለኛ Email ኣስገባ እንጂ በያ").notEmpty().withMessage("Email is ኣስፈላጊ ገቢቶ!")
]
const emailValidator =[
     check('email').isEmail().withMessage("ትክክለኛ Email ኣስገባ እንጂ በያ").notEmpty().withMessage("Email is ኣስፈላጊ ገቢቶ!")
]
module.exports = {
    validateSignUp,
    validateSignIn,
    verificationValidator,
    CodeValidator,
    emailValidator
}