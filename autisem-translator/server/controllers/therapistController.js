const therapistService = require("../services/therapistService");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

async function registerTherapist(req, res) {
  try {
    const {
      userName,
      firstName,
      lastName,
      phoneNumber,
      password,
      listOfPatients,
    } = req.body;
    await therapistService.createTherapist(
      userName,
      firstName,
      lastName,
      phoneNumber,
      password,
      listOfPatients
    );
    //after 1 hour refresh for another hour
    const token = jwt.sign({ userName }, SECRET_KEY, { expiresIn: "2m" });
    console.log(token);
    res
      .status(201)
      .json({ message: "Therapist registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getTherapistDetailes(req, res) {
  try {
    //after middleware the data is in user
    const decodedToken = req.user;
    console.log("getTherapistDetailes", decodedToken);
    const { userName } = decodedToken;
    const therapistDetails = await therapistService.getTherapist(userName);

    const newToken = res.getHeader("X-New-Token");
    console.log("New token from headers:", newToken);

    res
      .status(200)
      .json({
        message: "Therapist details retrieved successfully",
        therapistDetails,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerTherapist,
  getTherapistDetailes,
};
