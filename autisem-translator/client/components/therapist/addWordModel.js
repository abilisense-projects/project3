// AddWordModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable , Button, TextInput} from 'react-native';
import RecordAudio from '../recording/recording';
import recordingService from '../../services/backendServices/recordingService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const AddWordModal = ({ isVisible, onClose }) => {
    const [recordedData, setRecordedData] = useState(null);
    const [word, setWord] = useState('');
    const receiverId = useSelector((state) => state.user.user.userData._id);

    const uploadToServer = async (patientID, translation) => {
        try {
            if (recordedData) {
                const response = await recordingService.uploadRecording('words/word', recordedData, patientID, translation);
                console.log('Recording uploaded to server', response);
            } else {
                console.warn('No recording data available.');
            }
        } catch (error) {
            console.error('Error uploading recording', error);
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
                    <RecordAudio setRecordedData = {setRecordedData} > </RecordAudio>
                    <Button title="Add the word" onPress={() => uploadToServer(receiverId, word)} />

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
