const cloudinary = require('cloudinary').v2;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
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