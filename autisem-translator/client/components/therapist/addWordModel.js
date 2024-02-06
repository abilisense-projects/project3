import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Button, TextInput } from 'react-native';
import RecordAudio from '../recording/recording';
import recordingService from '../../services/backendServices/recordingService';
import GenericButton from '../shared/button';
import { translationService } from "../../services/translationService";


const AddWordModal = ({ isVisible, onClose, patientId }) => {

    const translate = translationService.translate;

    const [recordings, setRecordings] = useState([]); 
    const [word, setWord] = useState('');

    const handleRecord = (newRecording) => {
        setRecordings(prev => [...prev, newRecording]);
    };

    const uploadToServer = async () => {
        if (recordings.length < 8) {
            console.warn('At least 8 recordings are required.');
            return;
        }
        try {
            const response = await recordingService.uploadRecordings('words/word', recordings, patientId, word);
            console.log('Recordings uploaded to server', response);
        } catch (error) {
            console.error('Error uploading recordings', error);
        }
    };
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter word here"
                        value={word}
                        onChangeText={setWord}
                    />
                    <View style={styles.recordAudio}>
                    <RecordAudio setRecordedData={handleRecord} />
                    </View>
                    <View style={styles.centeredButton}>
                    <GenericButton title={translate("add the word")} onPress={uploadToServer} buttonWidth={120}></GenericButton>
                    <GenericButton title={translate("close")} onPress={onClose} buttonWidth={120}></GenericButton>
                    </View>
                    {/* <Button title="Add the word" onPress={uploadToServer} /> */}
                    {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable> */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal overlay
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    // button: {
    //     borderRadius: 20,
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //     elevation: 2,
    //     marginTop: 10, // Add space above the button
    // },
    // buttonClose: {
    //     backgroundColor: 'green', // Change to green to match the login button
    // },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        marginVertical: 12, // Add vertical margin
        marginHorizontal: 20, // Set horizontal margin
        borderWidth: 1,
        borderColor: 'lightgrey', // Set border color to light grey
        padding: 10,
        width: '90%', // Increase the width to match the login input fields
        borderRadius: 5, // Keep rounded corners
        backgroundColor: '#FFF', // Set background color to white
    },
    // Add a style for the Button component, if you want to override its default appearance
    buttonTitle: {
        color: '#FFF',
        fontSize: 16,
    },
    centeredButton:{
        marginTop: 10,
    },
    recordAudio: {
        marginTop: 20,
      },
});


export default AddWordModal;
