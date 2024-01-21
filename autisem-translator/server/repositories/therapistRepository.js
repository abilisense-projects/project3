const Patient = require('../models/patient');
const Therapist = require('../models/therapist');

//didnt use this...
async function sendNotificationToPatient(therapistId,patientUserName) {
  //how do i send notification
  return Therapist.findById(therapistId).populate('listOfPatients');
}

async function getPatientsDetails(patientId) {
  console.log(patientId)
  try {
    // Find the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.log(`Patient with ID ${patientId} not found`);
      return null;
    }
    // Apply the projection to the patient object
    const selectedDetails = {
      firstName: patient.firstName,
      lastName: patient.lastName,
    };
    return selectedDetails;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching patient details');
  }
}



module.exports = {
  sendNotificationToPatient,
  getPatientsDetails
};
