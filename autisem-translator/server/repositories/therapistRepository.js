const Therapist = require('../models/therapist');

async function getTherapistPPatientsById(therapistId) {
  return Therapist.findById(therapistId).populate('listOfPatients');
}

module.exports = {
  getTherapistPPatientsById,
};
