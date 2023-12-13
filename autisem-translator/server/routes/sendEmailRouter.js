const express = require("express");
const {
  sendEmail,
  generateRandomNumber,
  verifyCode,
} = require("../controllers/sendEmailController");

const sendEmailRouter = express.Router();

sendEmailRouter.post("/sendEmail", sendEmail);
sendEmailRouter.get("/generateRandomNumber", generateRandomNumber);
sendEmailRouter.post("/verifyCode", verifyCode); // New endpoint for code verification

module.exports = sendEmailRouter;
