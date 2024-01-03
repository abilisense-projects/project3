import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import TextInputField from '../shared/textInputField';
import GenericButton from '../shared/button';

const AssociatePatient = ({ isVisible, onConfirm, onCancel }) => {
    const [newPatientUsername, setNewPatientUsername] = useState('');

    const handleModalConfirm = () => {
        if (newPatientUsername.trim() !== '') {
            onConfirm(newPatientUsername);
            setNewPatientUsername('');
        } else {
            console.log('Invalid Username', 'Please enter a valid username.');
        }
    };

    const handleModalCancel = () => {
        setNewPatientUsername('');
        onCancel();
    };

    return (
        <Modal visible={isVisible}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TextInputField
                        placeholder="Enter patient username"
                        value={newPatientUsername}
                        onChangeText={(text) => setNewPatientUsername(text)}
                    />
                    <GenericButton onPress={handleModalConfirm} title='Confirm' />
                    <GenericButton onPress={handleModalCancel} title='Cancel' />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
});

export default AssociatePatient;
