const patientService = require('../services/patientService');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

async function registerPatient(req, res) {
  try {
    console.log(req.body);
    const { userName, firstName, lastName, phoneNumber, password, listOfTherapists } = req.body;
    await patientService.createPatient(userName, firstName, lastName, phoneNumber, password, listOfTherapists);
    //after 1 hour refresh for another hour
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '2m' });
    res.status(201).json({ message: 'Patient registered successfully',token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getPatientDetailes(req, res) {
  try {
    //after middleware the data is in user
    const decodedToken = req.user;
    console.log("getPatientDetailes",decodedToken)
    const { userName } = decodedToken;
    const therapistDetails = await patientService.getPatient(userName);

    const newToken = res.getHeader('X-New-Token');
    console.log('New token from headers:', newToken);
    
    res.status(200).json({ message: 'Therapist details retrieved successfully', therapistDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerPatient,
  getPatientDetailes
};