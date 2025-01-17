const Notification = require("../models/notification");
const Therapist = require("../models/therapist");

async function createNotification(senderId, receiverId, message) {
  const newNotification = new Notification({
    senderId,
    receiverId,
    message,
    status: "unread",
  });
  return await newNotification.save();
}

async function removeNotification(senderId, receiverId) {
  try {
    const result = await Notification.findOneAndDelete({ senderId: senderId, receiverId: receiverId });
    if (!result) {
      return { success: false, message: "Notification not found" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error removing notification:", error.message);
    return { success: false, message: "Error removing notification" };
  }
}

async function getUnreadNotificationsForPatient(receiverID) {
  // return Notification.find({ receiverId: patientId, status: "unread" });
  const notifications = await Notification.find({
    receiverId: receiverID.toString(),
    status: "unread",
  }).populate("senderId");
  const count = notifications.length;
  return count;
}

async function markNotificationAsRead(id, receiverID) {
  try {
    const updatedNotification = await Notification.findOneAndUpdate(
      {
        senderId: id,
        receiverId: receiverID,
      },
      { status: "read" },
      { new: true }
    );
    return true;
  } catch (error) {
    console.error("Error in getSenderIdByUsernameAndReceiverID:", error);
    return null;
  }
}

async function deletingTherapistOfPatient(id, receiverID) {
  try {
    const deleteNotification = await Notification.findOneAndDelete(
      {
        senderId: id,
        receiverId: receiverID,
      },
      { status: "read" },
      { new: true }
    );
    return true;
  } catch (error) {
    console.error("Error in getSenderIdByUsernameAndReceiverID:", error);
    return null;
  }
}

async function getListOfTherapistsByReceiverID(receiverID) {
  try {
    const notifications = await Notification.find({
      receiverId: receiverID.toString(),
      status: "unread",
    }).populate("senderId");

    // const count = notifications.length;

    const therapists = await Promise.all(
      notifications.map(async (notification) => {
        // Check if the senderId is present
        if (notification.senderId) {
          const therapistDetails = await Therapist.findOne({
            $or: [{ _id: notification.senderId }],
          });
          return {
            id: therapistDetails._id,
            userName: therapistDetails.userName,
            firstName: therapistDetails.firstName,
            lastName: therapistDetails.lastName,
            phoneNumber: therapistDetails.phoneNumber,
          };
        } else {
          console.warn("senderId not present in notification:", notification);
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

module.exports = {
  createNotification,
  removeNotification,
  getUnreadNotificationsForPatient,
  markNotificationAsRead,
  getListOfTherapistsByReceiverID,
  deletingTherapistOfPatient
};
