const AssociationService = require("../services/associationsService");
const therapistService = require("../services/therapistService");

async function getTherapistPatients(req, res) {
  try {
    const therapistId = req.params.therapistId;
    const patients = await AssociationService.getListOfPatientsByTherapistID(
      therapistId
    );
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sendNotificationToPatient(req, res) {
  try {
    const {therapistId,patientUserName} = req.body;
    const notification = await therapistService.sendNotificationToPatient(therapistId,patientUserName);
    if (notification === "PatientNotFound") {
      return res.status(200).json({ message: 'Patient not found' });
    }
    return res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPatientsDetails(req, res) {
  try {
    const {patientId} = req.body;
    const patientDetailes = await therapistService.getPatientsDetails(patientId);
    res.status(200).json(patientDetailes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getTherapistPatients,
  sendNotificationToPatient,
  getPatientsDetails
};
