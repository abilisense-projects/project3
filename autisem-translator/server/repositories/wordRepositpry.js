
const Word = require('../models/word');
const Recording = require('../services/recordingService');

async function createWord(recording, patientID, translation) {
    let newWord;
    try {
        // Await the completion of the uploadAudio function
        const recordingLink = await Recording.uploadAudio(recording);
        console.log(`Recording link: ${recordingLink}`);

        // Create a new Word object with the recording link
         newWord = new Word({
            recording: recordingLink,
            patientID: patientID,
            translation: translation        });
        console.log(newWord);
        // Save the new Word object
        return await newWord.save();
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
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

async function getAllWordsByPatientId(patientId) {
    try {
        const words = await Word.find({ patientID: patientId });
        if(words.length==0){
            return null;
        }
        return { success: true, words: words };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}


module.exports = {
    createWord,
    getAllWords,
    getAllWordsByPatientId
};
