const mongoose = require("mongoose");
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

// async function putPassword(userName, repeatPassword) {
//   // const { userId } = req.params;
//   // const { password } = req.body;
//   try {
//     const therapist = await Therapist.findOne({ userName });
//     const patient = await Patient.findOne({ userName });

//     // if (!!therapist)
//     if (therapist) {
//       therapist.password = repeatPassword;
//       await therapist.save();
//       res.status(200).json({ message: "Password updated successfully" });
//     } else if (patient) {
//       // else if (!!patient) {
//       patient.password = repeatPassword;
//       await patient.save();
//       res.status(200).json({ message: "Password updated successfully" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

module.exports = {
  createLogin,
  // putPassword,
};
