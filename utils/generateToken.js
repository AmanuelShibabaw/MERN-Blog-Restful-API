const jwt = require('jsonwebtoken')
const {jwtSecr} = require('../config/keys')
const generateToken = (user)=>{
    const token = jwt.sign({
        id:user._id,
        email:user.email,
        name:user.name,
        role:user.role
    },jwtSecr,{expiresIn:'1d'})

    return token;
}

module.exports = generateToken