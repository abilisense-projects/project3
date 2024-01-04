const express = require('express');
const { getPatientDetailes } = require('../controllers/patientController');
const authenticateJWT = require('../middlewares/authentication');

const patientRouter = express.Router();
//this should be removed the user does that already...
//here i use the token
patientRouter.get('/get',authenticateJWT, getPatientDetailes);
module.exports = patientRouter;
