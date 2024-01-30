const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }); 
const {getAllWords, createWord, translateWord} = require('../controllers/wordController')


const wordRouter = express.Router();
wordRouter.post("/word", upload.array('recordings[]'), createWord);
wordRouter.get("/words", getAllWords);
wordRouter.post("/translate",upload.single('audio'),  translateWord);

module.exports = wordRouter;