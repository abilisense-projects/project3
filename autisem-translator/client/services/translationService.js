import { I18n } from "i18n-js";
import enTranslations from '../translations/en.json';
import heTranslations from '../translations/he.json';
import AsyncStorage from '@react-native-async-storage/async-storage';


const i18n = new I18n();
i18n.translations = {
    en: enTranslations,
    he: heTranslations,
}
i18n.locale = 'he';  //It's for the meantime. The language depence on the user selection.


 export const translationService = {
    storeLanguage: async (language) => {
        try {
            await AsyncStorage.setItem('language', language)
        } catch (e) {
            console.log(e);
        }
    },
    translate : (word) => {
        try {
            return i18n.t(word);   
        } catch(e) {
          console.log(e);
        }
    }      
}


