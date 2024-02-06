const express = require("express");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.mp3');
    }
});
const upload = multer({ storage: storage });
const { getAllWords, createWord, translateWord,translateWordOpenAi } = require('../controllers/wordController');


const wordRouter = express.Router();
wordRouter.post("/word", upload.array('recordings[]'), createWord);
wordRouter.get("/words", getAllWords);
wordRouter.post("/translateAi",upload.single('audio'), translateWordOpenAi );
wordRouter.post("/translate",upload.single('audio'), translateWord );

module.exports = wordRouter;