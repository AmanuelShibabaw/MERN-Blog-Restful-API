const nodemailer = require('nodemailer')
const { myemail, emailpass } = require('../config/keys')

const sendCodeToEmail = async({emailTo,subject,code,content}) =>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:myemail,
            pass:emailpass
        }
    });
    const message = {
        to:emailTo,
        subject,
        html:`
            <div>
                <h3>use the code below to ${content}</h3>
                <p><strong>code: </strong>${code} </p>
            </div>
        `
    }
    await transporter.sendMail(message)
}

module.exports = sendCodeToEmail