
const wordRepository = require('../repositories/wordRepositpry');

const wordService = {
    async createWord(recording, patientID, translation) {
        try {
            const createdWord = await wordRepository.createWord(
                patientID,
                recording,
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

    
};

module.exports = wordService;
