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

  async markNotificationAsRead(id, receiverID) {
    return NotificationRepository.markNotificationAsRead(id, receiverID);
  },
  async getListOfTherapistsByReceiverID(receiverId) {
    return NotificationRepository.getListOfTherapistsByReceiverID(receiverId);
  },
  async deletingTherapistOfPatient(id, receiverID) {
    return NotificationRepository.deletingTherapistOfPatient(id, receiverID);
  },
 
};

module.exports = notificationService;
