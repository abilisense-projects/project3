const express = require("express");
const {
  sendEmail,
  generateRandomNumber,
  verifyCode,
} = require("../controllers/sendEmailController");

const sendEmailRouter = express.Router();

sendEmailRouter.post("/", sendEmail);
sendEmailRouter.get("/generateRandomNumber", generateRandomNumber);
sendEmailRouter.post("/verify-code", verifyCode); // New endpoint for code verification

module.exports = sendEmailRouter;
