const Patient = require('../models/patient');
const Word = require('../models/word');
const Recording = require('../services/recordingService');

async function createWord(recordings, patientID, translation) {
    console.log('recordings: ', recordings);
    console.log('patientID: ', patientID);
    console.log('translation: ', translation);
    try {
        const recordingLinks = await Promise.all(recordings.map(recording => 
            Recording.uploadAudio(recording)
        ));

        console.log(`Recording links: ${recordingLinks}`);

        const newWord = new Word({
            translation: translation,
            recordings: recordingLinks,
        });

        const savedWord = await newWord.save();
        console.log(savedWord);

        const updatedPatient = await Patient.findByIdAndUpdate(
            patientID,
            { $push: { wordIds: savedWord._id } },
            { new: true, useFindAndModify: false }
        );
        console.log(updatedPatient);

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

async function getAllWordsByPatientId(patientId) {
    try {
        const words = await Word.find({ patientID: patientId });
        if (words.length == 0) {
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
