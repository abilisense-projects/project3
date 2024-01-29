const wordService = require("../services/wordService");

async function createWord(req, res) {
    try {
        const patientID = req.body.patientID;
        const translation = req.body.translation; 
        const recordings = req.files.recordings; 

        if (!recordings || recordings.length === 0) {
            throw new Error('No recordings provided');
        }

        const recordingsData = recordings.map(recording => recording.buffer);
        await wordService.createWord(patientID, recordingsData, translation);

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
        const word = req.body.word;
        const translation = await wordService.translateWord(word);
        if (translation) {
            res.status(200).json({ message: 'translation retrieved successfully', translation: translation });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createWord,
    getAllWords
};
