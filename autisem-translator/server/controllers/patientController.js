const patientService = require('../services/patientService');

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
  getPatientDetailes
};