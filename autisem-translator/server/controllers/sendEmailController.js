const nodemailer = require("nodemailer");
// require("dotenv").config();

// const port = 3001; // or any other port you prefer

const generateRandomNumber = () => {
  let newNumbers = "";
  // Generate 6 random numbers
  while (newNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    newNumbers = newNumbers + randomNumber;
  }
  return newNumbers;
};

let verificationCode;

const sendEmail = (req, res) => {
  console.log(req.body);
  const { to } = req.body;
  console.log(to);
  verificationCode = generateRandomNumber();

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "glowing123456@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "glowing123456@gmail.com",
    to,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: error.toString() });
    }

    // You can optionally save the verification code in your database for later verification
    // ...

    res.status(200).json("Email sent: " + info.response);
  });
};

const verifyCode = (req, res) => {
  const { code } = req.body;

  console.log("Received code:", code);
  console.log("Stored verificationCode:", verificationCode);
  const storedCode = verificationCode; // Replace with actual retrieval logic

  if (code === storedCode) {
    res.status(200).json("Code is valid");
  } else {
    console.log("Invalid code");
    res.status(200).json("Invalid code");
  }
};

module.exports = { sendEmail, generateRandomNumber, verifyCode };
