const Patient = require('../models/patient');

async function createPatient(userName,firstName,lastName,phoneNumber, password,listOfPatients) {
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

module.exports= {
    createPatient,
};