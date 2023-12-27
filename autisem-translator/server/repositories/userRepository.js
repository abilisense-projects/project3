const bcrypt = require("bcrypt");
const Therapist = require("../models/therapist");
const Patient = require("../models/patient");

async function updateNew(userName, newPassword) {
  try {
    const filter = { userName };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const update = { password: hashedPassword };
    // const update = { password: newPassword };

    const therapistUpdate = await Therapist.findOneAndUpdate(filter, update);
    const patientUpdate = await Patient.findOneAndUpdate(filter, update);

    if (therapistUpdate || patientUpdate) {
      return { success: true };
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error updating password");
  }
}

async function createUser(
  userName,
  firstName,
  lastName,
  phoneNumber,
  password,
  type
) {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  if (type == "therapist") {
    const newTherapist = new Therapist({
      userName,
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
      // password,
    });
    return newTherapist.save();
  } else if (type == "patient") {
    const newPatient = new Patient({
      userName,
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
      // password,
    });
    return newPatient.save();
  }
}

async function getUser(userName) {
  // Implement the logic to get a user
  try {
    const therapist = await Therapist.findOne({ userName });
    const patient = await Patient.findOne({ userName });
    if (!therapist && !patient) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user: therapist || patient };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
}

async function loginUser(userName, password) {
  try {
    // let therapist = await Therapist.findOne({ userName, password });
    // let patient = await Patient.findOne({ userName, password });
    // return { user: therapist || patient };
    let therapist = await Therapist.findOne({ userName });
    let patient = await Patient.findOne({ userName });
    console.log("userName:", userName);
    if (!therapist && !patient) {
      return { user: null, message: "User not found" };
    }
    const user = therapist || patient;
    console.log("User:", user);
    console.log("UserPassword:", user.password);

    if (!user.password) {
      return { user: null, message: "User password not found" };
    }

    // Compare the entered password with the hashed password stored in the database using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", passwordMatch);

    if (passwordMatch) {
      return { user };
    } else {
      return { user: null, message: "Incorrect password" };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in");
  }
}

// Check if a username already exists (for new user registration)
async function doesUserNameExist(userName) {
  try {
    let therapist = await Therapist.findOne({ userName });
    let patient = await Patient.findOne({ userName });
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
  loginUser,
  doesUserNameExist,
};
