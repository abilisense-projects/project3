import React, { useState } from 'react';
import { View, Modal, StyleSheet,Text } from 'react-native';
import TextInputField from '../shared/textInputField';
import GenericButton from '../shared/button';
import { globalStyles } from '../../styles';

const AssociatePatient = ({ isVisible, onConfirm, onCancel, errorMessage }) => {
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
        <Modal visible={isVisible} transparent>
            <View style={styles.modalContainer}>
                <View style={globalStyles.whitePaper}>
                    <TextInputField
                        placeholder="Enter patient username"
                        value={newPatientUsername}
                        onChangeText={(text) => setNewPatientUsername(text)}
                    />
                    {errorMessage && (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    )}
                    <GenericButton onPress={handleModalConfirm} title='Confirm' buttonWidth={160} />
                    <GenericButton onPress={handleModalCancel} title='Cancel' buttonWidth={160} />
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01461cd6',
    },
    errorMessage: {
        color: 'red',
        marginTop: 5,
    },
});

export default AssociatePatient;
