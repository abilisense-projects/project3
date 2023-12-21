const Therapist = require("../models/therapist");
const Patient = require("../models/patient");

async function createLogin(userName, password) {
  try {
    const therapist = await Therapist.findOne({ userName, password });
    const patient = await Patient.findOne({ userName, password });

    return !!therapist || !!patient; // Returns true if user exists in therapists or patients, false otherwise
  } catch (error) {
    console.error(error);
    throw new Error("Error checking user existence");
  }
}

async function updateNewPassword(userName) {
  try {
    console.log(userName);
    const therapist = await Therapist.findOne({ userName });
    const patient = await Patient.findOne({ userName });

    return !!therapist || !!patient; // Returns true if user exists in therapists or patients, false otherwise
  } catch (error) {
    console.error(error);
    throw new Error("Error checking user existence");
  }
}

async function updateNew(userName, newPassword) {
  try {
    console.log(userName);
    const therapist = await Therapist.findOne({ userName });
    const patient = await Patient.findOne({ userName });
    if (therapist) {
      therapist.password = newPassword;
      await therapist.save();
    } else if (patient) {
      patient.password = newPassword;
      await patient.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error ");
  }
}

module.exports = {
  createLogin,
  updateNewPassword,
  updateNew,
};
