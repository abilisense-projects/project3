const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'drueubfvi', 
    api_key: '919876796936918', 
    api_secret: 'FGdiWO-KZxC102w7MupWdhobfCs' 
  });
function uploadAudio(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'video' },
            (error, result) => {
                if (error) {
                    console.log('Error uploading file');
                    reject(error);
                } else {
                    console.log(`File uploaded successfully: url:${result.secure_url}`);
                    resolve(result.secure_url);
                }
            }
        ).end(file);
    });
}module.exports = {
    uploadAudio
};