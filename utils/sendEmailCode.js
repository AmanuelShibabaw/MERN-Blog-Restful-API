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
        html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Verification Code</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="400" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); padding: 30px;">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <h2 style="color: #333333; margin: 0;">Email Verification</h2>
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; color: #555555; line-height: 1.5; padding-bottom: 20px;">
              Hello,
              <br /><br />
              Thank you for registering with us! Please use the verification code below to complete your sign-up process.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px 0;">
              <span style="display: inline-block; background-color: #007bff; color: #ffffff; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 6px; letter-spacing: 4px;">
               <p><strong>code:</strong>${code} </p>
              </span>
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #888888; text-align: center; padding-top: 10px;">
              If you did not request this code, please ignore this email.
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #888888; text-align: center; padding-top: 30px;">
              &copy; 2025 Amanuel Computer Scientist
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

        `
    }
    await transporter.sendMail(message)
}

module.exports = sendCodeToEmail