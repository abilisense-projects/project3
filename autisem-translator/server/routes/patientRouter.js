const express = require("express");
const {
  registerPatient,
  getPatientDetailes,
  getPatientsTherapist,
} = require("../controllers/patientController");
const authenticateJWT = require("../middlewares/authentication");

const patientRouter = express.Router();

patientRouter.post("/register", registerPatient);
//here i use the token
patientRouter.get("/get", authenticateJWT, getPatientDetailes);
// patientRouter.get("/:receiverId/therapists", getPatientsTherapist);
patientRouter.get("/:receiverId", getPatientsTherapist);
// patientRouter.get("/change", getStatusChange);

module.exports = patientRouter;
