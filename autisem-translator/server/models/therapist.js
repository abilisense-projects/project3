const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  username: String,
  firstName:String,
  lastName:String,
  phoneNumber:String,
  password: String,
});

const Therapist = mongoose.model('Thrapist', therapistSchema,'therapists');

module.exports = Therapist;