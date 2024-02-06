const wordService = require("../services/wordService");

async function createWord(req, res) {
    try {
        console.log('req.body: ', req.body);
        const patientID = req.body.patientID;
        const translation = req.body.translation; 
        const recordings = req.files; 

        if (!recordings || recordings.length === 0) {
            throw new Error('No recordings provided');
        }

        const recordingsData = recordings.map(recording => recording.buffer);
        await wordService.createWord(recordingsData, patientID, translation);

        res.status(201).json({ message: 'Words added successfully to the dictionary' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllWords(req, res) {
    try {
        const allWords = await wordService.getAllWords();
        if (allWords) {
            res.status(200).json({ message: 'all words  retrieved successfully', words:allWords });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function translateWord(req, res) {
    try {
        const randomStrings = ['Bottle', 'Bread', 'Coffee']; // This is for the meantime
        const audioFile = req.file; // audioFile now holds the audio data from the form
        const randomIndex = Math.floor(Math.random() * randomStrings.length);
        const translation = randomStrings[randomIndex];

        // Send the random string as a translation
        res.status(200).json({ message: 'Translation retrieved successfully', translation: translation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function translateWordOpenAi(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        const result = await wordService.translateWord(req.file);
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing the file.');
    }
}

module.exports = {
    createWord,
    getAllWords,
    translateWord,
    translateWordOpenAi
};
