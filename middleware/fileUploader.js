
const multer = require('multer')
const path = require('path')
const generateCode = require('../utils/genrateVerifCode')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const originalname = file.originalname
        const extensionoffile = path.extname(originalname)
        const filename = originalname.replace(extensionoffile,"")
        const compressedfilename = filename.split(" ").join("_")
        const lowercasefilename = compressedfilename.toLocaleLowerCase()
        const code = generateCode(12)
        const finalfilename = `${lowercasefilename}_${code}${extensionoffile}`
        callback(null,finalfilename)

    }
})
const upload = multer({
    storage,
    fileFilter:(req,res,callback)=>{
        if(res.mimetype === 'image/png' || res.mimetype === 'image/jpg' || res.mimetype === 'image/jpeg'){
            callback(null,true)
        }else{
            callback(new Error (" Only .png, .jpg and .jpeg format allowed!"),false)
        }
    }
})

module.exports = upload