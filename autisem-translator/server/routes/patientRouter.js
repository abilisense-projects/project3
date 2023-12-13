const express = require('express');
const { registerPatient } = require('../controllers/patientController');

const patientRouter = express.Router();

patientRouter.post('/register', registerPatient);

module.exports = patientRouter;
