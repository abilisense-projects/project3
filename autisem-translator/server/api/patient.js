const express = require('express');
const multer = require('multer');
const logger = require('../middlewares/logger');
const upload = multer({ dest: 'uploads/' }); 
const router = express.Router();
const app = express();


router.post('/uploadRecording', upload.single('audio'), (req, res) => {
  //This function in the meantime only save the recording as a file
  const file = req.file;
  // console.log(typeof(file));
  console.log(file);
  console.log(`Received file: ${file}`);


  res.status(200).send('File received successfully');
  return res;
});
router.use(logger);
module.exports = router;