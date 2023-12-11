const Therapist = require('../models/therapist');

async function createTherapist(userName,firstName,lastName,phoneNumber, password,listOfPatients) {
    //const hashedPassword = await bcrypt.hash(password, 10);

    const newTherapist = new Therapist({
        userName,
        firstName,
        lastName,
        phoneNumber,
        password,
        listOfPatients,
    })
    return newTherapist.save();
}

module.exports= {
    createTherapist,
};