const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const therapistRouter = require("../routes/therapistRoutes");
const sendEmailRouter = require("./routes/sendEmailRouter");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
// const port = 3001; // or any other port you prefer

mongoose.connect(
  "mongodb+srv://project2:ZHSOOL82BkOHytOk@cluster0.bjexzcl.mongodb.net/autisem?retryWrites=true&w=majority"
);
app.use(cors());
app.use(bodyParser.json());
app.use("/therapists", therapistRouter);
app.use("/therapists", therapistRouter);
app.use("/sendEmail", sendEmailRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
