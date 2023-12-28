const express = require("express");
const {getAllWords, createWord} = require('../controllers/wordController')

const wordRouter = express.Router();
wordRouter.post("/word", createWord);
wordRouter.get("/words", getAllWords);

module.exports = wordRouter;