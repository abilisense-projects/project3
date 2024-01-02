const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const logger = require('../middlewares/logger');
const upload = multer({ storage }); 
const router = express.Router();
const AWS = require("aws-sdk");

const app = express();

const s3 = AWS({
  accessKeyId:'',
  secretAccessId:''
})

const uploadAudio = (fileName,bucketName,file) =>{
  const params = {
    Key: fileName,
    Bucket: bucketName,
    Body: file,
    ContentType:'audio/mpeg', 
    ACL:'public-read'

  }
  s3.upload(params, (err, data)=>{

  })
}

router.post('/uploadRecording', upload.single('audio'), (req, res) => {
  //This function in the meantime only save the recording as a file
  const file = req.file.buffer;
  const fileName = `recoreding from: ${Date.now}`;
  const bucketName = '';
  const link =  uploadAudio(fileName,bucketName,file);
  console.log(file);
  console.log(`Received file: ${fileName}`);


  res.status(200).send('File received successfully');
  return res;
});
router.use(logger);
module.exports = router;