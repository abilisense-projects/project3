
const associationRepository = require("../repositories/associationsRepository");
const notificationService = require("./notificationService");

const associationService = {
  async createAssociation(therapistID, patientID) {
    return associationRepository.createAssociation(therapistID, patientID)
  },
  async removeAssociation(therapistID, patientID) {
    //remove the notification
    const r=notificationService.removeNotification(therapistID,patientID)
    if(r.success==false){
      return null
    }
    return associationRepository.removeAssociation(therapistID, patientID)
  },
  async getListOfPatientsByTherapistID(therapistID) {
    return associationRepository.getListOfPatientsByTherapistID(therapistID);
  },
  async markNotificationAsConfirmed(id, receiverID) {
    return associationRepository.markNotificationAsConfirmed(id, receiverID);
  },

}

module.exports = associationService;
