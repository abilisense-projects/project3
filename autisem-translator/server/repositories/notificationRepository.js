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

async function getUnreadNotificationsForPatient(patientId) {
  return Notification.find({ receiverId: patientId, status: "unread" });
}

async function markNotificationAsRead(notificationId) {
  return Notification.findByIdAndUpdate(
    notificationId,
    { status: "read" },
    { new: true }
  );
}

async function getListOfTherapistsByReceiverID(receiverID) {
  try {
    console.log("receiverID 2: ", receiverID);
    const notifications = await Notification.find({
      receiverId: receiverID.toString(),
      status: "unread",
    }).populate("senderId");

    const count = notifications.length;
    console.log("count: ", count);

    const therapists = await Promise.all(
      notifications.map(async (notification) => {
        // Check if the senderId is present
        if (notification.senderId) {
          console.log("senderId: ", notification.senderId);
          const therapistDetails = await Therapist.findOne({
            $or: [{ _id: notification.senderId }],
          });

          console.log("therapistDetails", therapistDetails);

          return {
            userName: therapistDetails.userName,
            firstName: therapistDetails.firstName,
            lastName: therapistDetails.lastName,
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
    console.log("filteredTherapists", filteredTherapists);
    return {
      therapists: filteredTherapists,
      count,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error getting associations by therapistID",
    };
  }
}

// async function getTheChangeInTheCaregiverStatus(notificationId) {
//   return Notification.findByIdAndUpdate(
//     notificationId,
//     { status: "read" },
//     { new: true }
//   );
// }

module.exports = {
  createNotification,
  getUnreadNotificationsForPatient,
  markNotificationAsRead,
  getListOfTherapistsByReceiverID,
};
