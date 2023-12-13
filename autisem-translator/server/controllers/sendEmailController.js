// const express = require("express");//
const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");//

// const app = express();//
// const port = 3001; // or any other port you prefer

// app.use(bodyParser.json());//

const generateRandomNumber = () => {
  let newNumbers = "";
  // Generate 6 random numbers
  while (newNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    newNumbers = newNumbers + randomNumber;
  }
  return newNumbers;
};

const sendEmail = (req, res) => {
  const { to } = req.body;
  console.log(to);
  const verificationCode = generateRandomNumber();

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m0527606589@gmail.com",
      pass: "your_email_password",
    },
  });

  const mailOptions = {
    from: "m0527606589@gmail.com",
    to,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendEmail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // You can optionally save the verification code in your database for later verification
    // ...

    res.status(200).send("Email sent: " + info.response);
  });
};

const verifyCode = (req, res) => {
  const { code } = req.body;

  // TODO: Retrieve the previously generated code for the given email from your database
  const storedCode = { verificationCode }; // Replace with actual retrieval logic

  if (code === storedCode) {
    res.status(200).send("Code is valid");
  } else {
    res.status(400).send("Invalid code");
  }
};

module.exports = { sendEmail, generateRandomNumber, verifyCode };

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your_email@gmail.com",
//     pass: "your_email_password",
//   },
// });

// const sendEmail = (req, res) => {
//   const { to, subject, text, email } = req.body;

//   const mailOptions = {
//     from: "your_email@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   transporter.sendEmail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send("Email sent: " + info.response);
//   });
// };

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

//Define a route for sending emails
// app.post("/sendEmail", (req, res) => {
//   const { to, subject, text, email } = req.body;

//   const mailOptions = {
//     from: "your_email@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   transporter.sendEmail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send("Email sent: " + info.response);
//   });
// });//
