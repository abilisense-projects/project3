const Patient = require('../models/patient');


async function getPatient(userName) {
    try {
        const patient = await Patient.findOne({ userName });
        if (!patient) {
            return { success: false, message: 'Patient not found' };
        }
        return { success: true, patient };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

module.exports = {
    getPatient
};