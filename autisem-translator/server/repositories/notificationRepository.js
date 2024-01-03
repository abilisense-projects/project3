const Notification = require('../models/notification');

 async function createNotification(senderId, receiverId, message) {
    const newNotification = new Notification({
      senderId,
      receiverId,
      message,
      status: 'unread',
    });
    return await newNotification.save();
  }

 async function getUnreadNotificationsForPatient(patientId) {
    return Notification.find({ receiverId: patientId, status: 'unread' });
  }

 async function markNotificationAsRead(notificationId) {
    return Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });
  }

module.exports = {createNotification,getUnreadNotificationsForPatient,markNotificationAsRead};
