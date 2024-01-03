
const associationRepository = require("../repositories/associationsRepository");

const associationService = {
  async createAssociation(therapistID, patientID) {
    return associationRepository.createAssociation(therapistID, patientID)
  },

  async getListOfPatientsByTherapistID(therapistID) {
    return associationRepository.getListOfPatientsByTherapistID(therapistID);
  },

}

module.exports = associationService;
