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

  async markNotificationAsRead(notificationId) {
    return NotificationRepository.markNotificationAsRead(notificationId);
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
