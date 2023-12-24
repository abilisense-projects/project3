import React, { useState } from 'react';
import { View, Pressable, Modal, StyleSheet, Text, Picker } from 'react-native';

const HamburgerModal = ({ modalVisible, closeModal, openBackgroundSelection }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageList, setShowLanguageList] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language === 'Hebrew') {
      console.log('נבחר עברית');
    } else if (language === 'English') {
      console.log('Selected English');
    }
    setShowLanguageList(false);
    closeModal();
  };
 

  return (
    <Modal transparent visible={modalVisible} onRequestClose={closeModal}>
      <Pressable style={styles.modalBackground} onPress={closeModal}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.languageButton} onPress={() => setShowLanguageList(!showLanguageList)}>
            <Text>Language</Text>
          </Pressable>
          {showLanguageList && (
            <Picker
              selectedValue={selectedLanguage} style={styles.languagePicker}
              onValueChange={(itemValue) => handleLanguageChange(itemValue)}
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Hebrew" value="Hebrew" />
            </Picker>
          )}
          <Pressable style={styles.backgroundButton} onPress={openBackgroundSelection}>
            <Text>Open Background Selection</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({

    modalBackground: {
      position: 'absolute',
      left: 20,
      top: 50,
      flex: 1,
      justifyContent: 'flex-end', // Align modal to the bottom
      alignItems: 'center',
    },
  
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'black',
      padding: 20,
      height: 400,
      width: 250,
    },
  
    backgroundButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'lightgray',
    },
  
    languageButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'lightgray',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    languagePicker: {
      height: 40,
      width: 100,
    },
  });

export default HamburgerModal;





