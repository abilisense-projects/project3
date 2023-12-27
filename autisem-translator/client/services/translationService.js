import { I18n } from "i18n-js";
import enTranslations from '../translations/en.json';
import heTranslations from '../translations/he.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


const i18n = new I18n();
i18n.translations = {
    en: enTranslations,
    he: heTranslations,
}

export const translationService = {
    getLanguage: () => {
        return i18n.locale;
    },
    storeLanguage: async (language) => {
        try {
            await AsyncStorage.setItem('language', language)
        } catch (e) {
            console.log(e);
        }
    },
    getLanguageFromStorage: async () => {
        try {
            const language = await AsyncStorage.getItem('language');
            return language;
        } catch (e) {
            console.log(e);
        }
    },
    initializeLanguage: async () => {
        try {
            const storedLanguage = await translationService.getLanguageFromStorage();
            i18n.locale = storedLanguage || 'en';
        } catch (error) {
            console.error('Error setting language:', error);
            i18n.locale = 'en'; // default to English if there's an error
        }
    },
    translate: (word) => {
        try {
            return i18n.t(word);
        } catch (e) {
            console.log(e);
        }
    }
}



