const express = require('express');
const multer = require('multer');
const logger = require('../middlewares/logger');
const upload = multer({ dest: 'uploads/' }); // נגדיר ספריית uploads להכנסת הקבצים
const router = express.Router();
const app = express();


router.post('/uploadRecording', upload.single('audio'), (req, res) => {
  //This function in the meantime only save the recording as a file
  const file = req;
  
  console.log(`Received file: ${file}`);


  res.status(200).send('File received successfully');
});
router.use(logger);
module.exports = router;