const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const therapistRouter = require('../routes/therapistRoutes');
const cors = require('cors');
const patientRouter = require('../routes/patientRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const MONGO_DB_URL=process.env.DB_URL;

//generate secret key
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey);

mongoose.connect(MONGO_DB_URL);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-New-Token');
  res.header('Access-Control-Expose-Headers', 'X-New-Token');
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use('/therapists', therapistRouter);
app.use('/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});