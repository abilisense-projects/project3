const therapistService = require('../services/therapistService');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

async function registerTherapist(req, res) {
  try {
    const { userName, firstName, lastName, phoneNumber, password, listOfPatients } = req.body;
    await therapistService.createTherapist(userName, firstName, lastName, phoneNumber, password, listOfPatients);
    //what happens after 1 hour
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ message: 'Therapist registered successfully' ,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getTherapistDetailes(req, res) {
  try {
    // Extract the user information from the token in the request header
    const decodedToken = req.user;
    console.log("getTherapistDetailes",decodedToken)
    const { userName } = decodedToken;
    const therapistDetails = await therapistService.getTherapist(userName);
    res.status(200).json({ message: 'Therapist details retrieved successfully', therapistDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerTherapist,
  getTherapistDetailes
};