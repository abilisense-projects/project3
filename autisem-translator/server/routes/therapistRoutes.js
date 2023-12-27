const express = require('express');
const { getTherapistPatients} = require('../controllers/therapistController') ;

const therapistRouter = express.Router();

therapistRouter.get('/:therapistId/patients', getTherapistPatients);

module.exports = therapistRouter;
