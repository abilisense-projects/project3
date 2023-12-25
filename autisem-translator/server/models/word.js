const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  patientID: String,
  recording:String,
  translation:String,
});

const Word = mongoose.model('Words', wordSchema,'word');

module.exports = Word;