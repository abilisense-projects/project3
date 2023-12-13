const patientService = require('../services/patientService');

async function registerPatient(req, res) {
  try {
    console.log(req.body);
    const { userName, firstName, lastName, phoneNumber, password, listOfPatients } = req.body;
    await patientService(userName, firstName, lastName, phoneNumber, password, listOfPatients);
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerPatient,
};