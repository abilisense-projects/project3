const Patient = require('../models/patient');

async function createPatient(userName, firstName, lastName, phoneNumber, password, listOfPatients) {
    //const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
        userName,
        firstName,
        lastName,
        phoneNumber,
        password,
        listOfPatients,
    })
    return newPatient.save();
}
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
    createPatient,
    getPatient
};