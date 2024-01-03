const AssociationService = require('../services/associationsService');
const therapistService = require('../services/therapistService');

async function getTherapistPatients(req, res) {
  try {
    const therapistId = req.params.therapistId;
    const patients = await AssociationService.getListOfPatientsByTherapistID(therapistId);
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function sendNotificationToPatient(req, res) {
  try {
    const {therapistId,patientUserName} = req.body;
    console.log("notify in controller therapist",therapistId,patientUserName)
    const notification = await therapistService.sendNotificationToPatient(therapistId,patientUserName);
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getTherapistPatients,
  sendNotificationToPatient
};
