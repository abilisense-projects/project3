const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  userName: String,
  firstName:String,
  lastName:String,
  phoneNumber:String,
  password: String,
  listOfPatients:[String],
});

const Therapist = mongoose.model('Therapist', therapistSchema,'therapists');

module.exports = Therapist;