const express = require('express');
const { registerTherapist, getTherapistDetailes } = require('../controllers/therapistController') ;
const authenticateJWT = require('../middlewares/authentication');

const therapistRouter = express.Router();

//here i get the token
therapistRouter.post('/register', registerTherapist);
//here i use the token
therapistRouter.get('/get',authenticateJWT, getTherapistDetailes);

module.exports = therapistRouter;
