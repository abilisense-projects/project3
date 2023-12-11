const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const therapistRouter = require('../routes/therapistRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://project2:ZHSOOL82BkOHytOk@cluster0.bjexzcl.mongodb.net/autisem?retryWrites=true&w=majority');
app.use(cors());
app.use(bodyParser.json());
app.use('/therapists', therapistRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});