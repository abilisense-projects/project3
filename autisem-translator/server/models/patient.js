const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  password: String,
  image: String,
  profileImage: String,
  wordIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word'
  }]
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
