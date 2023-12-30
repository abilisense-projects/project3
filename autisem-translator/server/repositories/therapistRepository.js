// therapistRepository.js

const Therapist = require('../models/therapist');

async function createTherapist(userName, firstName, lastName, phoneNumber, password, listOfPatients) {
    const newTherapist = new Therapist({
        userName,
        firstName,
        lastName,
        phoneNumber,
        password,
        listOfPatients,
    });
    return newTherapist.save();
}

async function getTherapist(userName) {
    try {
        const therapist = await Therapist.findOne({ userName });
        if (!therapist) {
            return { success: false, message: 'Therapist not found' };
        }
        return { success: true, therapist };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

async function checkUserNameExists(userName) {
    try {
        const therapist = await Therapist.findOne({ userName });
        return { success: true, exists: therapist !== null };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

module.exports = {
    createTherapist,
    getTherapist,
    checkUserNameExists,
};
