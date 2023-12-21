const express = require('express');
const { registerPatient, getPatientDetailes } = require('../controllers/patientController');
const authenticateJWT = require('../middlewares/authentication');

const patientRouter = express.Router();

patientRouter.post('/register', registerPatient);
//here i use the token
patientRouter.get('/get',authenticateJWT, getPatientDetailes);
module.exports = patientRouter;
