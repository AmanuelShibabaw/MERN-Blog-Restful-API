const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const validateToken = require('../middleware/validateTokenAuth')
const {fileController} = require('../controllers')
const upload = require('../middleware/fileUploader')
router.post('/upload',validateToken,isAdmin,upload.single("image"),fileController.uploadFile)

module.exports = router