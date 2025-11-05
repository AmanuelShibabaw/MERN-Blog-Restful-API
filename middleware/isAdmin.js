const isAdmin = (req,res,next)=>{
    try {
        if(req.user.role === 1 || req.user.role === 2){
            next()
        }else{
            res.code = 401
            throw new Error("access denied becauser you rae not an admin")
        }
    } catch (error) {
        next(error)
    }
}


module.exports = isAdmin