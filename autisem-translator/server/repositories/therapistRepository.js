const Therapist = require('../models/therapist');

async function createTherapist(username,firstName,lastName,phoneNumber, password) {
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newTherapist = new Therapist({
        username,
        firstName,
        lastName,
        phoneNumber,
        password,
    })
    return newTherapist.save();
}

module.exports= {
    createTherapist,
};