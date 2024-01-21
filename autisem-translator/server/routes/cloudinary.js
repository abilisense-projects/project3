const express = require("express");
const cloudinary = require('cloudinary').v2;

const cloudinaryRouter = express.Router();

cloudinaryRouter.post('/upload', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
                { public_id: "olympic_flag" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        console.log("result", result);
        res.json({ success: true, message: 'File uploaded successfully' });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = cloudinaryRouter;
