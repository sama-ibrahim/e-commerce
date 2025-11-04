import * as nodemailer from "nodemailer"


 export async function sendMail(mailOptions:nodemailer.SendMailOptions){

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // ignore SSL 
    auth:{
        user:process.env.EMAIL_USER,

        pass:process.env.EMAIL_PASS,
    }
  })
 
 await  transporter.sendMail(mailOptions)

}