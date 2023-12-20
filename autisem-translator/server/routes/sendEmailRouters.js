const express = require("express");
const {
  sendEmail,
  generateRandomNumber,
  verifyCode,
} = require("../controllers/sendEmailController");

const sendEmailRouters = express.Router();

sendEmailRouters.post("/sendEmail", sendEmail);
sendEmailRouters.get("/generateRandomNumber", generateRandomNumber);
sendEmailRouters.post("/verifyCode", verifyCode); // New endpoint for code verification

module.exports = sendEmailRouters;
