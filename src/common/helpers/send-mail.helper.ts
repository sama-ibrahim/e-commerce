import * as nodemailer from "nodemailer"


 export async function sendMail(mailOptions:nodemailer.SendMailOptions){

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
     port: 587, 
    secure: false, // ignore SSL 
    auth:{
        user:process.env.EMAIL_USER,

        pass:process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized:false
    }
  })
 
 await  transporter.sendMail(mailOptions)

}