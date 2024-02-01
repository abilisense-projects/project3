const patientService = require("../services/patientService");
const notificationService = require("../services/notificationService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

async function getPatientsTherapist(req, res) {
  try {
    const receiverId = req.params.receiverId;
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
    const { id, receiverID } = req.body;
    const change = await notificationService.markNotificationAsRead(
      id,
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
    const { userName } = decodedToken;
    const therapistDetails = await patientService.getPatient(userName);
    const newToken = res.getHeader("X-New-Token");
    res.status(200).json({
      message: "Therapist details retrieved successfully",
      therapistDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deletingTherapistFromNotification(req, res) {
  try {
    const { id, receiverID } = req.body;
    const deleting = await notificationService.deletingTherapistOfPatient(
      id,
      receiverID
    );
    res.json(deleting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getPatientDetailes,
  getPatientsTherapist,
  statusChange,
  unreadNotifications,
  deletingTherapistFromNotification
};
