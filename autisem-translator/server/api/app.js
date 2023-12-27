const bodyParser = require("body-parser");
const therapistRouter = require("../routes/therapistRoutes");
const sendEmailRouter = require("../routes/sendEmailRouters");
const patientRouter = require("../routes/patientRouter");
const userRouter = require("../routes/userRouter");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
