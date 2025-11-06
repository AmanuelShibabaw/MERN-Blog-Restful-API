
const uploadFile = async (req,res,next)=>{
    try {
        res.send("file uploaded successfully")
    } catch (error) {
        next(error)
    }
}
module.exports = {uploadFile}