const NotificationRepository = require("../repositories/notificationRepository");

const notificationService = {
  async createNotification(senderId, receiverId, message) {
    //return {massage:`created notification from ${sender} to ${getter}`}
    return NotificationRepository.createNotification(
      senderId,
      receiverId,
      message
    );
  },

  async getUnreadNotificationsForPatient(patientId) {
    return NotificationRepository.getUnreadNotificationsForPatient(patientId);
  },

  async markNotificationAsRead(userName, receiverID) {
    return NotificationRepository.markNotificationAsRead(userName, receiverID);
  },
  async getListOfTherapistsByReceiverID(receiverId) {
    return NotificationRepository.getListOfTherapistsByReceiverID(receiverId);
  },
  // async getTheChangeInTheCaregiverStatus(receiverId, userName) {
  //   return NotificationRepository.getTheChangeInTheCaregiverStatus(
  //     receiverId,
  //     userName
  //   );
  // },
};

module.exports = notificationService;
