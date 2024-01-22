const express = require("express");
const {
  getPatientDetailes,
  statusChange,
  getPatientsTherapist,
  unreadNotifications,
  deletingTherapistFromNotification,
} = require("../controllers/patientController");
const authenticateJWT = require("../middlewares/authentication");
const { statusChangeToConfirmed , getlistOfAssociatedTherapist, deletingTherapistFromAssociations } = require('../controllers/associationsController');


const patientRouter = express.Router();
//this should be removed the user does that already...

//here i use the token
patientRouter.get("/get", authenticateJWT, getPatientDetailes);
patientRouter.put("/change", statusChange);
patientRouter.put("/changeAssociations", statusChangeToConfirmed);
patientRouter.get("/list/:receiverId", getPatientsTherapist);
patientRouter.get("/ListOfAssociatedTherapists/:receiverId", getlistOfAssociatedTherapist);
patientRouter.get("/:patientId", unreadNotifications);
patientRouter.delete("/deleteFromNotification", deletingTherapistFromNotification);
patientRouter.delete("/deleteFromAssociations", deletingTherapistFromAssociations);



module.exports = patientRouter;
