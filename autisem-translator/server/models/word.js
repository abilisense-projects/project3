const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  recording:String,
  patientID: String,
  translation:String,
});

const Word = mongoose.model('Words', wordSchema,'word');

module.exports = Word;