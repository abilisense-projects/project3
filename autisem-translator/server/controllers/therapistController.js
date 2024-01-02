const therapistService = require('../services/therapistService');

async function getTherapistPatients(req, res) {
  try {
    const therapistId = req.params.therapistId;
    const patients = await therapistService.getTherapistPatients(therapistId);
    res.json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getTherapistPatients,
};
