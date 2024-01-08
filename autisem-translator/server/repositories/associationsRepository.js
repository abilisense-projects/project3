const Associations = require("../models/associations");

async function createAssociation(therapistID, patientID) {
  try {
    const newAssociation = new Associations({ therapistId: therapistID, patientId: patientID, status: 'Pending' });
    await newAssociation.save();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating association" };
  }
}

async function getListOfPatientsByTherapistID(therapistID, status) {
  try {
    //do i need this query?
    const query = status ? { therapistId: therapistID, status: status } : { therapistId: therapistID };
    const associations = await Associations.find(query).populate('patientId');

    return associations.map(association => ({
      patientDetails: association.patientId, 
      status: association.status,
    }));
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error getting associations by therapistID" };
  }
}

//   static async getAssociationsByPatientID(patientID) {
//     return Associations.find({ patientId: patientID });
//   }
// }

module.exports = {createAssociation,getListOfPatientsByTherapistID};
