const therapistService = require('../services/therapistService');

async function registerTherapist(req, res) {
  try {
    console.log(req.body);
    const { userName, firstName, lastName, phoneNumber, password, listOfPatients } = req.body;
    await therapistService(userName, firstName, lastName, phoneNumber, password, listOfPatients);
    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerTherapist,
};