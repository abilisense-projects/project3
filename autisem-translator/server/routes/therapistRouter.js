const express = require('express');
const { getTherapistPatients,sendNotificationToPatient} = require('../controllers/therapistController') ;
const { create } = require('../controllers/associationsController');

const therapistRouter = express.Router();

therapistRouter.get('/:therapistId/patients', getTherapistPatients);
therapistRouter.post('/sendNotification', sendNotificationToPatient);

//create association-do i need it here?
therapistRouter.post('/create', create);
module.exports = therapistRouter;
