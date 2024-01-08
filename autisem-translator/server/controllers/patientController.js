const patientService = require("../services/patientService");
const notificationService = require("../services/notificationService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

async function getPatientsTherapist(req, res) {
  try {
    const receiverId = req.params.receiverId;
    console.log("Receiver Iddddd: ", receiverId);
    const therapists =
      await notificationService.getListOfTherapistsByReceiverID(receiverId);
    res.json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function unreadNotifications(req, res) {
  try {
    const receiverId = req.params.patientId;
    console.log("receiver Id: ", receiverId);
    const therapists =
      await notificationService.getUnreadNotificationsForPatient(receiverId);
    res.json(therapists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function statusChange(req, res) {
  try {
    const { userName, receiverID } = req.body;
    console.log("userName, receiverID ", userName, receiverID);
    const change = await notificationService.markNotificationAsRead(
      userName,
      receiverID
    );
    res.json(change);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPatientDetailes(req, res) {
  try {
    //after middleware the data is in user
    const decodedToken = req.user;
    console.log("getPatientDetailes", decodedToken);
    const { userName } = decodedToken;
    const therapistDetails = await patientService.getPatient(userName);

    const newToken = res.getHeader("X-New-Token");
    console.log("New token from headers:", newToken);

    res.status(200).json({
      message: "Therapist details retrieved successfully",
      therapistDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getPatientDetailes,
  getPatientsTherapist,
  statusChange,
  unreadNotifications,
};
