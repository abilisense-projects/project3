const Therapist = require("../models/therapist");
const Patient = require("../models/patient");

async function updateNew(userName, newPassword) {
  try {
    const filter = { userName };
    const update = { password: newPassword };

    const therapistUpdate = await Therapist.findOneAndUpdate(filter, update);
    const patientUpdate = await Patient.findOneAndUpdate(filter, update);

    if (therapistUpdate || patientUpdate) {
      return { success: true };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error updating password");
  }
}

async function createUser(userName, firstName, lastName, phoneNumber, password,type) {
  if(type=='therapist'){
    const newTherapist = new Therapist({
      userName,
      firstName,
      lastName,
      phoneNumber,
      password,
  });
  return newTherapist.save();
  }
  else if(type=='patient'){
    const newPatient = new Patient({
      userName,
      firstName,
      lastName,
      phoneNumber,
      password,
  })
  return newPatient.save();
  }
}

async function getUser(userName) {
  // Implement the logic to get a user
  try {
    const therapist = await Therapist.findOne({ userName });
    const patient = await Patient.findOne({ userName });
    if (!therapist && !patient) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, user: therapist || patient };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Internal server error' };
  }
}

async function checkUserNameExists(userName, password) {
  try {
    console.log(userName,password)
    let therapist, patient;
    if (password) {
      therapist = await Therapist.findOne({ userName, password });
      console.log("therapist",therapist)
      patient = await Patient.findOne({ userName, password });
      console.log("patient",patient)
    } else {
      therapist = await Therapist.findOne({ userName });
      patient = await Patient.findOne({ userName });
    }
    return { exists: therapist || patient };
  } catch (error) {
    console.error(error);
    throw new Error("Error checking username existence");
  }
}


module.exports = {
  updateNew,
  createUser,
  getUser,
  checkUserNameExists,
};
