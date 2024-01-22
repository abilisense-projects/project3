const express = require('express');
const { getTherapistPatients,sendNotificationToPatient,getPatientsDetails} = require('../controllers/therapistController') ;
const { create, remove } = require('../controllers/associationsController');

const therapistRouter = express.Router();

therapistRouter.get('/:therapistId/patients', getTherapistPatients);
therapistRouter.post('/sendNotification', sendNotificationToPatient);
therapistRouter.get('/patients-details/:patientId', getPatientsDetails);

//create association-do i need it here?
therapistRouter.post('/create', create);
therapistRouter.delete('/',remove)
module.exports = therapistRouter;
