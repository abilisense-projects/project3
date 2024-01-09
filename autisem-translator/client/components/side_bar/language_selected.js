import React, { useState } from 'react';
import { View,  StyleSheet, Text, Picker } from 'react-native';
import { translationService } from '../../services/translationService';

const LanguageSelected = () => {
   // onPress={() => setShowLanguageList(!showLanguageList)}
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageList, setShowLanguageList] = useState(true);

  

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language === 'Hebrew') {
      console.log('נבחר עברית');
      translationService.storeLanguage('he');
      
    } else if (language === 'English') {
      console.log('Selected English');
      translationService.storeLanguage('en');
    }
    translationService.initializeLanguage();

    setShowLanguageList(false);
  };


  return (
        <View >
          {showLanguageList && (
            <Picker
              selectedValue={selectedLanguage} style={styles.languagePicker}
              onValueChange={(itemValue) => handleLanguageChange(itemValue)}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hebrew" value="Hebrew" />
            </Picker>
          )}

        </View>
    
  );
};

const styles = StyleSheet.create({

  modalButton: {
    width: 220,
    height: 40,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },

  languagePicker: {
    height: 40,
    width: 100,
  },


});

export default LanguageSelected;