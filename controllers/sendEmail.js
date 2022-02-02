const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

//-------------------------------------
// Sending Email Using Ethereal and Nodemailer
//------------------------------------
const sendEmailEthereal = async (req, res) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in Gmail: "https://www.google.com/settings/security/lesssecureapps. Select the radio button to allow "Less Secure Apps""
  });

  // 2) Define the mail options
  const mailOptions = {
    from: "Ankur Sinha <ankur@codatrix.com>",
    to: "bar@example.com",
    subject: "Hello",
    text: "Hello from the other side",
    html: "<h2>Sending emails with NodeJS</h2>",
  };

  // 3) Actually send the Email with Nodemailer
  const email = await transporter.sendMail(mailOptions);

  res.json(email);
};

//-------------------------------------
// Sending Email Using SendGrid API and NodeJS
//------------------------------------
const sendEmail = async (req, res) => {
  // 1) Create a transporter using SendGrid API Key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // 2) Define the mail options
  const msg = {
    to: "ankursinha.2411@gmail.com", // Change to your recipient
    from: "Ankur Sinha <ankursinha.2411@gmail.com>", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  // 3) Actually send the Email with Nodemailer
  // const email = await sgMail.send(msg);
  // res.json(email);

  await sgMail.send(msg);
  res.status(200).json({ success: true });
};

module.exports = sendEmail;
