const jwt = require('jsonwebtoken')
const {jwtSecr} = require('../config/keys')
const validateToken = async(req,res,next)=>{
    try {
        const authorization = req.headers.authorization ? req.headers.authorization.split(" ") : []
        const token= authorization.length > 1 ? authorization[1] : null
        if(token){
            const payload = jwt.verify(token,jwtSecr)
            if(payload){
                req.user = payload
            }else{
                res.code = 401
                throw new Error("ህገ ወጥ ሰው is detected !")
            }
            next()
        }else{
            res.code = 401
            throw new Error("TOken not provided")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = validateToken