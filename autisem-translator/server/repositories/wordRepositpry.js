
const Word = require('../models/word');
const Recording = require('../services/recordingService');

async function createWord(recording, patientID, translation,) {
    try {
        const recordingLink = Recording.uploadAudio('recording', recording);
        console.log('recordingLink',recordingLink);
        const newWord = new Word({
            recordingLink,
            patientID,
            translation
        });
        return newWord.save();
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }

}

async function getAllWords() {
    try {
        const words = await Word.find({});
        return { success: true, words: words };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

module.exports = {
    createWord,
    getAllWords
};
