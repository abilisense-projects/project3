const Patient = require('../models/patient');
const Word = require('../models/word');
const Recording = require('../services/recordingService');

async function createWord(recordings, patientID, translation) {
    try {
        const recordingLinks = await Promise.all(recordings.map(recording => 
            Recording.uploadAudio(recording)
        ));


        const newWord = new Word({
            word: 'word', // This is for the meantime
            translation: translation,
            recordings: recordingLinks,
        });

        const savedWord = await newWord.save();

        const updatedPatient = await Patient.findByIdAndUpdate(
            patientID,
            { $push: { wordIds: savedWord._id } },
            { new: true, useFindAndModify: false }
        );

        return savedWord._id;
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

async function getListOfWordsByIds(wordIds) {
    try {
        const words = await Word.find({ _id: { $in: wordIds } });
        const wordDetailsArray = words.map(word => {
            const firstRecording = word.recordings.length > 0 ? word.recordings[0] : null;
            return { translation: word.translation, firstRecording: firstRecording };
        });
        return { success: true, words: wordDetailsArray };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal server error' };
    }
}

async function findWordByTranscription(transcription) {
    return await Word.findOne({ word: transcription });
}


module.exports = {
    createWord,
    getAllWords,
    getListOfWordsByIds,
    findWordByTranscription
};
