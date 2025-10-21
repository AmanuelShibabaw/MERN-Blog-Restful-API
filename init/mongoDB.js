const mongoose = require("mongoose")
const {connectionurl} = require("../config/keys")

const connectMongodb = async()=>{
    try {
        await mongoose.connect(connectionurl)
        console.log("Db connected succesfully")
    } catch (error) {
        console.log("ERROR WHILE CONNECTING :",error)
    }
}

module.exports = connectMongodb