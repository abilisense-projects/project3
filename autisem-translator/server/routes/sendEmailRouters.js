const express = require("express");
const {
  sendEmail,
  generateRandomNumber,
  verifyCode,
} = require("../controllers/sendEmailController");

const sendEmailRouters = express.Router();

sendEmailRouters.post("/", sendEmail);
sendEmailRouters.get("/generateRandomNumber", generateRandomNumber);
sendEmailRouters.post("/verify-code", verifyCode); // New endpoint for code verification

module.exports = sendEmailRouters;
