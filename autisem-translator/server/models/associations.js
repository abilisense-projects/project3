const mongoose = require('mongoose');

const associationsSchema = new mongoose.Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  status: String,
});

const Associations = mongoose.model('Associations', associationsSchema);

module.exports = Associations;