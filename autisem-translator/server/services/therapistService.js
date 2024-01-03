const notificationService = require('./notificationService');
const userService = require('./userService');

async function sendNotificationToPatient(therapistId, patientUserName) {
  try {
    //first check if there is patient with this userName
    const userNameExists = await userService.doesUserNameExist(patientUserName)
    if (userNameExists) {
      const patientId = userNameExists._id;
      const notification = await notificationService.createNotification(therapistId, patientId, "hi")
      console.log("notification", notification)
      return notification;
    }
    return null;
  } catch (error) {
    throw new Error('Error sending notification');
  }
}

module.exports = {
  sendNotificationToPatient
};