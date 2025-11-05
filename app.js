const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const morgan = require('morgan')
dotenv.config()
const connectMongodb = require('./init/mongoDB')
const app = express()
const {errorHandler} = require('./middleware')
const {authRoute,catagoryRoute} = require('./routes')
const notFound = require('./controllers/notFound')

connectMongodb()
app.use(express.json({limit: "500mb"}))
app.use(bodyParser.urlencoded({limit: "500mb",extended: true }))
app.use(morgan('dev'))//responsun console lay lemayet yteqmenal😁
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/catagory',catagoryRoute)
app.use(notFound)
app.use(errorHandler)

module.exports = app;