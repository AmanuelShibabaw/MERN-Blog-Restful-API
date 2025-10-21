const errorHandler = (error,req,res,next)=>{
    const code = res.code ? res.code:500;

    res.status(code).json({code,message:error.message||"Internal Server Error",stack:error.stack})
}

module.exports = errorHandler