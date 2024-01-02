const therapistRepository = require('../repositories/therapistRepository');

async function getTherapistPatients(therapistId) {
  try {
    const therapist = await therapistRepository.getTherapistPPatientsById(therapistId);
    console.log("therapist",therapist)
    return therapist ? therapist.listOfPatients : [];
  } catch (error) {
    throw new Error('Error fetching therapist patients');
  }
}

module.exports = {
  getTherapistPatients,
};