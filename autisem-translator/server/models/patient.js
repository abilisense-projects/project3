const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userName: String,
  firstName:String,
  lastName:String,
  phoneNumber:String,
  password: String,
  wordDictionary: {
    type: Map,
    of: String,
    default: {},
  },
  image: String,
  profileImage: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;