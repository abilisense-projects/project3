const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const therapistRouter = require("../routes/therapistRoutes");
const sendEmailRouter = require("../routes/sendEmailRouters");
const patientRouter = require("../routes/patientRouter");
const userRouter = require("../routes/userRouter");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.DB_URL;

mongoose.connect(MONGO_DB_URL);
console.log(MONGO_DB_URL);

app.use(cors());
app.use(bodyParser.json());
app.use("/therapists", therapistRouter);
app.use("/patients", patientRouter);
app.use("/sendEmailRouter", sendEmailRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
