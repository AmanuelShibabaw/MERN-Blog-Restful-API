
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
})

module.exports = upload