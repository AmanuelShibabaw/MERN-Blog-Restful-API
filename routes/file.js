const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const validateToken = require('../middleware/validateTokenAuth')
const {fileController} = require('../controllers')
router.post('/upload',validateToken,isAdmin,fileController.uploadFile)

module.exports = router