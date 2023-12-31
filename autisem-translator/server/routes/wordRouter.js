const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }); 
const {getAllWords, createWord} = require('../controllers/wordController')

const uploadFields = [
    { name: 'recording', maxCount: 1 },
    { name: 'translation', maxCount: 1 },
    { name: 'patientID', maxCount: 1 }
];
const wordRouter = express.Router();
wordRouter.post("/word", upload.fields(uploadFields),  createWord);
wordRouter.get("/words", getAllWords);

module.exports = wordRouter;