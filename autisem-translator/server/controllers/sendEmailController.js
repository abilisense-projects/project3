const nodemailer = require("nodemailer");
const userService = require("../services/userService");
// require("dotenv").config();

// const port = 3001; // or any other port you prefer

let verificationCode;
let verificationAttempts = 0;

const generateRandomNumber = () => {
  let newNumbers = "";
  // Generate 6 random numbers
  while (newNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    newNumbers = newNumbers + randomNumber;
  }
  return newNumbers;
};

const sendEmail = async (req, res) => {
  verificationAttempts = 0;
  //
  const { userName } = req.body;
  console.log(userName);

  //  Check if the required fields are provided
  if (!userName) {
    return (
      res
        .status(200)
        //400
        .json({ message: "Username are required" })
    );
  }
  const userNameExist = await userService.doesUserNameExist(userName);
  if (userNameExist) {
    // User exists, return the user details
    res.status(200).json({ message: "User exists", userNameExist });

    console.log(req.body);
    // const { to } = req.body;
    let to = userName;
    console.log(to);
    verificationCode = generateRandomNumber();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "glowing123456@gmail.com",
        // user: "doNotReplay@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "glowing123456@gmail.com",
      to,
      // userName,
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
  } else {
    // User does not exist, return a message to register
    res.status(200).json({ message: "User does not exist. Please register." });
  }
};

const maxAttempts = 10;
const disableDuration = 2 * 60 * 1000; // 30 minutes in milliseconds

const verifyCode = (req, res) => {
  verificationAttempts = verificationAttempts + 1;
  console.log("attempts: ", verificationAttempts);

  if (verificationAttempts >= maxAttempts) {
    verificationAttempts = 0;
    const currentTime = new Date().getTime();
    console.log("time:", currentTime);
    const disableUntil = currentTime + disableDuration;
    console.log("disableUntil: ", disableUntil);

    return res.status(200).json({
      message: "Maximum attempts reached. Please try again later.",
      disableUntil,
    });
  }

  const { code } = req.body;

  console.log("Received code:", code);
  console.log("Stored verificationCode:", verificationCode);
  const storedCode = verificationCode; // Replace with actual retrieval logic

  if (code === storedCode) {
    res.status(200).json("Code is valid");
  } else {
    console.log("Invalid code");
    res.status(200).json("Invalid code");
    //500
  }
};

module.exports = { sendEmail, generateRandomNumber, verifyCode };
