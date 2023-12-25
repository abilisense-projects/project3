const wordService = require("../services/wordService");

async function createWord(req, res) {
    try {
        const { patientID, recording, translation } = req.body;
        await wordService.createWord(patientID, recording, translation);
        res.status(201).json({ message: 'word added saccesfully to the dictionary' });
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

module.exports = {
    createWord,
    getAllWords
};
