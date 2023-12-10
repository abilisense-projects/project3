const express = require('express');
const { registerTherapist } = require('../controllers/therapistController') ;

const therapistRouter = express.Router();

therapistRouter.post('/register', registerTherapist);

module.exports = therapistRouter;
