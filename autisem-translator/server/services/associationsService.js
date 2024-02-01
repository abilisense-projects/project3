
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
  async updateStatusAssociation(id, receiverID,status) {
    console.log("status",status)
    return associationRepository.updateStatusAssociation(id, receiverID,status);
  },

  async getlistTherapist(receiverID) {
    return associationRepository.getlistTherapist(receiverID);
  },
  async deletingTherapistOfPatient(id, receiverID) {
    return associationRepository.deletingTherapistOfPatient(id, receiverID);
  },

}

module.exports = associationService;
