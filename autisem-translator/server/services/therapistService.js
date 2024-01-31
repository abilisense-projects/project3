const associationService = require('./associationsService');
const notificationService = require('./notificationService');
const userService = require('./userService');
const wordService = require('./wordService');
const TherapistRepository = require("../repositories/therapistRepository");



async function sendNotificationToPatient(therapistId, patientUserName) {
  try {
    //first check if there is patient with this userName
    const userNameExists = await userService.doesUserNameExist(patientUserName)
    if (userNameExists.exists) {
      const patientId = userNameExists.exists._id;
      //create notification
      const notification = await notificationService.createNotification(therapistId, patientId, "hi");
      //create association 
      const association = await associationService.createAssociation(therapistId,patientId);
      //check if association returned succesfull
      return notification;
    }
    else {
      // Patient not found
      return "PatientNotFound";
    }
  } catch (error) {
    throw new Error('Error sending notification');
  }
}

async function getPatientsDetails(patientId) {
  try {
    //get basic detailes
    const details = await TherapistRepository.getPatientsDetails(patientId)
    //get list of words
    const words = await wordService.getAllWordsByPatientId(patientId)
    return {patient:details,words:words}
  } catch (error) {
    throw new Error('Error sending notification');
  }
}

module.exports = {
  sendNotificationToPatient,
  getPatientsDetails
};