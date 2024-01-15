const Associations = require("../models/associations");
const Therapist = require("../models/therapist");

async function createAssociation(therapistID, patientID) {
  try {
    const newAssociation = new Associations({
      therapistId: therapistID,
      patientId: patientID,
      status: "Pending",
    });
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
    const query = status
      ? { therapistId: therapistID, status: status }
      : { therapistId: therapistID };
    const associations = await Associations.find(query).populate("patientId");

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

async function getlistTherapist(patientID) {
  try {
    console.log("patientId: ", patientID);
    const associations = await Associations.find({
      patientId: patientID.toString(),
      status: "Confirmed",
    }).populate("therapistId");

    const therapists = await Promise.all(
      associations.map(async (association) => {
        // Check if the senderId is present
        if (association.therapistId) {
          console.log("therapistId: ", association.therapistId);
          const therapistDetails = await Therapist.findOne({
            $or: [{ _id: association.therapistId }],
          });

          console.log("therapistDetails", therapistDetails);
          console.log("therapistDetails._id", therapistDetails._id);
          return {
            id: therapistDetails._id,
            userName: therapistDetails.userName,
            firstName: therapistDetails.firstName,
            lastName: therapistDetails.lastName,
          };
        } else {
          console.warn("senderId not present in notification:", association);
          return null;
        }
      })
    );

    // Filter out null values (notifications without senderId)
    const filteredTherapists = therapists.filter(
      (therapist) => therapist !== null
    );
    console.log("filteredTherapists", filteredTherapists);
    return {
      therapists: filteredTherapists,
      // count,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error getting associations by therapistID",
    };
  }
}

async function deletingTherapistOfPatient(id, receiverID) {
  try {
    const deleteAssociations = await Associations.findOneAndDelete(
      {
        therapistId: id,
        patientId: receiverID,
      },
      { status: "Confirmed" },
      { new: true }
    );
    console.log("deleteAssociations", deleteAssociations);

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
  getlistTherapist,
  deletingTherapistOfPatient,
};
