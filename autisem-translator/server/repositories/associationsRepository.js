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

async function removeAssociation(therapistID, patientID) {
  try {
    console.log(therapistID,patientID)
    const result = await Associations.findOneAndDelete({ therapistId: therapistID, patientId: patientID });
   console.log("result",result) 
    if (!result) {
      // No document found matching the criteria
      return { success: false, message: "Association not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error removing association:", error.message);
    return { success: false, message: "Error removing association" };
  }
}


async function getListOfPatientsByTherapistID(therapistID, status) {
  try {
    //do i need this query?
    const query = status ? { therapistId: therapistID, status: status } : { therapistId: therapistID };
    const associations = await Associations.find(query).populate('patientId');

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
  removeAssociation,
  getListOfPatientsByTherapistID,
  markNotificationAsConfirmed,
};
