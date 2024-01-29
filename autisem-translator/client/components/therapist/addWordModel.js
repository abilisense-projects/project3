import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Button, TextInput } from 'react-native';
import RecordAudio from '../recording/recording';
import recordingService from '../../services/backendServices/recordingService';

const AddWordModal = ({ isVisible, onClose, patientId }) => {
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
                    <RecordAudio setRecordedData={handleRecord} />
                    <Button title="Add the word" onPress={uploadToServer} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
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
        marginTop: 22,
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%', // Set width
        borderRadius: 5, // Optional: for rounded corners
    },
});

export default AddWordModal;
