const Associations = require("../models/associations");

async function createAssociation(therapistID, patientID) {
  try {
    const newAssociation = new Associations({
      therapistId: therapistID,
      patientId: patientID,
      status: "Pending",
    });
    const savedAssociation = await newAssociation.save();
    console.log(savedAssociation);
    return savedAssociation;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating association" };
  }
}

async function getListOfPatientsByTherapistID(therapistID) {
  try {
    const associations = await Associations.find({
      therapistId: therapistID,
    }).populate("patientId");

    return associations.map((association) => ({
      patientDetails: association.patientId,
      status: association.status,
    }));
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error getting associations by therapistID",
    };
  }
}

module.exports = { createAssociation, getListOfPatientsByTherapistID };
