const nodemailer = require('nodemailer');
const config = require('../config/config');


async function sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
}

module.exports = {
    sendMail
}
