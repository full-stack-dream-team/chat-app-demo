const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.TEST_MAIL_USER,
    pass: process.env.TEST_MAIL_PASS,
  },
});

const sendEmail = (data) =>
  transport.sendMail({
    from: "React App <noreply@familyilove.com>",
    to: data.to,
    subject: `Hello ${data.name}`,
    text: data.text,
    html: data.html,
  });

module.exports = sendEmail;
