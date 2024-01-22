const AWS = require('aws-sdk');
const BucketName = '';

const s3 = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: ''
})
async function uploadAudio(fileName, file) {
    const params = {
        Key: fileName,
        Bucket: BucketName,
        Body: file,
        ContentType: 'audio/mpeg',
        ACL: 'public-read'

    }
    // const uploadPromise = s3.upload(params).promise();
    return "for the meantime"; //uploadPromise.Location;
}
module.exports = {
    uploadAudio
};