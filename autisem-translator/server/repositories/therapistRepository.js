const Therapist = require('../models/therapist');

//didnt use this...
async function sendNotificationToPatient(therapistId,patientUserName) {
  //how do i send notification
  return Therapist.findById(therapistId).populate('listOfPatients');
}

module.exports = {
  sendNotificationToPatient
};
