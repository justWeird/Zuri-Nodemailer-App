//Import all required modules
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//initialize express
const app = express();

//Begin initializing the needed methods for nodemailer
//Initialize the transporter method for SMTP
//NOTE SINCE I USED A GMAIL ACCOUNT TO SEND, I HAVE TO USE GMAIL 2FA instead of regular password
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_2FA,
  },
  //tls allows us send mail from local server. If this is not added,
  //it will reject the connection
  tls: {
    rejectUnauthorized: false,
  },
});

//configure the message fields that will be sent as an object through the transporter
let mailOptions = {
    from: process.env.EMAIL_USER,
    to: "jfblaing997@gmail.com",
    subject: "Zuri Nodemailer Test",
    text: "Congratulations! You have successfully sent the required email. Continue reading the documentation to better understand it."
}

//call the sendmail method and send the mail
transporter.sendMail(mailOptions, (err, success) => {
    if(err){
        console.log(err)
    } else {
        console.log("Email Sent!")
    }
})

//set app listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
