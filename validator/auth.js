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

module.exports = {
    validateSignUp,
    validateSignIn
}