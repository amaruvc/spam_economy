const nodemailer = require("nodemailer");

async function main(options) {
  // Usando mailtrap
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.mailtrap.io",
  //     port: 2525,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: "0d0b2532b9f9fd",
  //       pass: "13f3a0b7344db9",
  //     },
  //   });

  //usando gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mbensan.test@gmail.com",
      pass: "mbensan.2022",
    },
  });

  // send mail with defined transport object
  await transporter.sendMail(options);
}
module.exports = main;
