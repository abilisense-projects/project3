const therapistService = require('../services/therapistService');

async function registerTherapist(req, res) {
  try {
    const { username,firstName,lastName,phoneNumber, password } = req.body;
     await therapistService(username,firstName,lastName,phoneNumber, password);
    res.status(201).json({ message: 'Therapist registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerTherapist,
};