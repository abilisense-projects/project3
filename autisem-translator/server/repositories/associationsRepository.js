const mongoose = require('mongoose');
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

async function removeAssociation(therapistID, patientID) {
  try {
    const result = await Associations.findOneAndDelete({ therapistId: therapistID, patientId: patientID });
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

async function updateStatusAssociation(id, receiverID, status3) {
  try {
    // Convert strings to ObjectId
    const therapistId = new mongoose.Types.ObjectId(id);
    const patientId =new mongoose.Types.ObjectId(receiverID);
    const queryConditions = { therapistId, patientId };
    const updatedAssociations = await Associations.findOneAndUpdate(
      queryConditions,
      { status: status3 },
      { new: true }
    );
    if (updatedAssociations) {
      console.log("Update successful:", updatedAssociations);
      return true;
    } else {
      console.log("Association not found for update");
      return false;
    }
  } catch (error) {
    console.error("Error in updateStatusAssociation:", error);
    return false;
  }
}



async function getlistTherapist(patientID) {
  try {
    const associations = await Associations.find({
      patientId: patientID.toString(),
      status: "Confirmed",
    }).populate("therapistId");

    const therapists = await Promise.all(
      associations.map(async (association) => {
        // Check if the senderId is present
        if (association.therapistId) {
          const therapistDetails = await Therapist.findOne({
            $or: [{ _id: association.therapistId }],
          });
          return {
            id: therapistDetails._id,
            userName: therapistDetails.userName,
            firstName: therapistDetails.firstName,
            lastName: therapistDetails.lastName,
            phoneNumber: therapistDetails.phoneNumber,
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
  updateStatusAssociation,
  getlistTherapist,
  deletingTherapistOfPatient,
};
