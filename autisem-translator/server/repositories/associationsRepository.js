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

async function markNotificationAsConfirmed(id, receiverID) {
  try {
    const updatedAssociations = await Associations.findOneAndUpdate(
      {
        therapistId: id,
        patientId: receiverID,
      },
      { status: "Confirmed" },
      { new: true }
    );
    console.log("updatedAssociations", updatedAssociations);

    return true;
  } catch (error) {
    console.error("Error in getSenderIdByUsernameAndReceiverID:", error);
    return null;
  }
}

module.exports = {
  createAssociation,
  getListOfPatientsByTherapistID,
  markNotificationAsConfirmed,
};
