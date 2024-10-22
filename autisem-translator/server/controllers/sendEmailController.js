// Import the nodemailer library for sending emails and the userService for user-related operations
const nodemailer = require("nodemailer");
const userService = require("../services/userService");

// Declare global variables for verification code and attempts
let verificationCode;
let verificationAttempts = 0;

// Function to generate a random 6-digit number
const generateRandomNumber = () => {
  let newNumbers = "";
  while (newNumbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    newNumbers = newNumbers + randomNumber;
  }
  return newNumbers;
};

// Function to send a verification email
const sendEmail = async (req, res) => {
  // Reset verification attempts counter
  verificationAttempts = 0;

  // Extract username from the request body
  const { userName } = req.body;
  //  Check if the required fields are provided
  if (!userName) {
    return (
      res
        .status(200)
        //400
        .json({ message: "Username are required" })
    );
  }

  // Check if the username already exists in the userService
  const userNameExist = await userService.doesUserNameExist(userName);
  if (userNameExist.exists) {
    // User exists, return the user details
    res.status(200).json({ message: "User exists", userNameExist });
    // Extract email address (username) from the request body
    let to = userName;
    verificationCode = generateRandomNumber();

    // Create a Nodemailer transporter using Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abilisens.practikum@gmail.com",
        // user: "doNotReplay@gmail.com",
        pass: process.env.PASSWORD,
      },
    });

    // Configure email options
    const mailOptions = {
      from: 'Abilisense <abilisens.practikum@gmail.com>',
      to,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: error.toString() });
      }

      // Email sent successfully
      res.status(200).json("Email sent: " + info.response);
    });
  } else {
    // User does not exist, return a message to register
    res.status(200).json({ message: "User does not exist. Please register." });
  }
};

// Define constants for maximum verification attempts and disable duration
const maxAttempts = 10;
const disableDuration = 2 * 60 * 1000; // 30 minutes in milliseconds

// Function to verify the received verification code
const verifyCode = (req, res) => {
  // Increment verification attempts counter
  verificationAttempts = verificationAttempts + 1;
  // Check if the maximum attempts have been reached
  if (verificationAttempts >= maxAttempts) {
    verificationAttempts = 0;
    const currentTime = new Date().getTime();
    const disableUntil = currentTime + disableDuration;
    // Return a message indicating the maximum attempts reached and the time until reactivation
    return res.status(200).json({
      message: "Maximum attempts reached. Please try again later.",
      disableUntil,
    });
  }

  // Extract the verification code from the request body
  const { code } = req.body;
  const storedCode = verificationCode;
  // Compare the received code with the stored verificationCode
  if (code === storedCode) {
    res.status(200).json("Code is valid");
  } else {
    res.status(200).json("Invalid code");
    //500
  }
};

// Export the functions for use in other modules
module.exports = { sendEmail, generateRandomNumber, verifyCode };
