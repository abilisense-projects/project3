const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word:String,
  translation: String,
  recordings: [String]});

const Word = mongoose.model('Words', wordSchema,'word');

module.exports = Word;