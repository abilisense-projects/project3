
const Word = require('../models/word');

async function createWord(recording, patientID, translation) {
    const newWord = new Word({
        recording,
        patientID,
        translation
    });
    return newWord.save();
}


async function getAllWords() {
    try {
        const words = await Word.find({});
        return { success: true, words:words};
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

module.exports = {
    createWord,
    getAllWords
};
