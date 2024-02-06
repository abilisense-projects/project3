
const wordRepository = require('../repositories/wordRepositpry');
const fs = require('fs');
require('dotenv').config();
const OpenAI = require('openai').default;
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });


const wordService = {
    async createWord(recordings, patientID, translation) {
        try {
            const createdWord = await wordRepository.createWord(
                recordings,
                patientID,
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

    async getListOfWordsByIds(words) {
        try {
            const fetchedWords = await wordRepository.getListOfWordsByIds(words)
            if(fetchedWords==null){
                return { success: false, message: { success: false, message: null } };
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

    async translateWord(audioFile) {
        const transcription = await this.getTranscription(audioFile);
        const word = await wordRepository.findWordByTranscription(transcription.text);
        if (word) {
            return {
                translation: word.translation,
                transcription: transcription.text,
                message: 'Transcription retrieved successfully'
            };
            
        } else {
            return {
            message: 'Word not found'
          }
        }
    },
    
    async getTranscription(audioFile) {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: 'whisper-1',
            language: 'he',
        });
        fs.unlinkSync(audioFile.path);
        return transcription;
    }
    
};

module.exports = wordService;
