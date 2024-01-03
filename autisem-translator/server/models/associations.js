const mongoose = require('mongoose');

const associationsSchema = new mongoose.Schema({
  //should this be a ref for therapist table?
  therapistId: String,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  status: String,
});

const Associations = mongoose.model('Associations', associationsSchema);

module.exports = Associations;