const mongoose = require('mongoose');

//i want this to be reuseable also for therapist
const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
