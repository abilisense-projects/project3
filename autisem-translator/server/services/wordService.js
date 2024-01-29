
const wordRepository = require('../repositories/wordRepositpry');

const wordService = {
    async createWord(recordings, patientID, translation) {
        try {
            const createdWord = await wordRepository.createWord(
                patientID,
                recordings,
                translation
            );

            return { success: true, word: createdWord };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Failed to create word' };
        }
    },

    async getAllWords() {
        try {
            const fetchedWords = await wordRepository.getAllWords();
            if (!fetchedWords.success) {
                return { success: false, message: 'Failed to retrieve words' };
            }
            return { success: true, words: fetchedWords.words };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal server error' };
        }
    },

    async getAllWordsByPatientId(patientId) {
        try {
            const fetchedWords = await wordRepository.getAllWordsByPatientId(patientId)
            if(fetchedWords==null){
                return { success: false, message: null };
            }
            else if (!fetchedWords.success) {
                return { success: false, message: 'Failed to retrieve words' };
            }
            return { success: true, words: fetchedWords.words };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Internal server error' };
        }
    },
    
};

module.exports = wordService;
