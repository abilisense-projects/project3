// import express from 'express';

// const app = express();


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const therapistRouter = require('../routes/therapistRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://project2:ZHSOOL82BkOHytOk@cluster0.bjexzcl.mongodb.net/autisem?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use('/therapists', therapistRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// module.exports(app) ;
