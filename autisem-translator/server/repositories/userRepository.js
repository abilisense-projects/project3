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
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    if (type === "therapist") {
      newUser = new Therapist({
        userName,
        firstName,
        lastName,
        phoneNumber,
        password: hashedPassword, // Store the hashed password
        // password,
      });
    } else if (type === "patient") {
      newUser = new Patient({
        userName,
        firstName,
        lastName,
        phoneNumber,
        password: hashedPassword, // Store the hashed password
        // password,
      });
    }

    const savedUser = await newUser.save();
    return { success: true, userId: savedUser._id };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating user" };
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
    let therapist = await Therapist.findOne({ userName });
    let patient = await Patient.findOne({ userName });
    console.log("patient:", patient);
    if (!therapist && !patient) {
      return { user: null, message: "User not found" };
    }
    const user = therapist || patient;

    if (user) {
      const p=await comparePassword(password, user.password)
      if (p) {
        if (therapist) {
          return { user: { ...therapist.toObject(), type: "therapist" } };
        } else if (patient) {
          return { user: { ...patient.toObject(), type: "patient" } };
        }
      }
    }
    return null
  } catch (error) {
    console.error(error);
    throw new Error("Error logging in");
  }
}

async function comparePassword(password, hashedPassword) {
  // Compare the entered password with the hashed password stored in the database using bcrypt
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password match:", passwordMatch);
  return passwordMatch;
}

// Check if a username already exists (for new user registration)
async function doesUserNameExist(userName) {
  try {
    const therapist = await Therapist.findOne({ userName });
    const patient = await Patient.findOne({ userName });

    return therapist ? { exists: true, type: 'therapist' ,data:therapist } :
           patient   ? { exists: true, type: 'patient' ,data:patient } :
                       { exists: false, type: null,data:null };
  } catch (error) {
    console.error(error);
    throw new Error("Error checking username existence");
  }
}

async function updateNewImage(userName, image) {
  try {
    const filter = { userName };
    const update = { image: image };
    //const therapistUpdate = await Therapist.findOneAndUpdate(filter, update);
    const patientUpdate = await Patient.findOneAndUpdate(filter, update);
    if (patientUpdate) {
      return { success: true };
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error updating password");
  }
}

module.exports = {
  updateNew,
  createUser,
  getUser,
  loginUser,
  doesUserNameExist,
  updateNewImage,
};
