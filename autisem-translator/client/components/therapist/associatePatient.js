import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import TextInputField from '../shared/textInputField';
import GenericButton from '../shared/button';
import { globalStyles } from '../../styles';

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
            <View style={globalStyles.whitePaper}>
                <TextInputField
                    placeholder="Enter patient username"
                    value={newPatientUsername}
                    onChangeText={(text) => setNewPatientUsername(text)}
                />
                <GenericButton onPress={handleModalConfirm} title='Confirm' />
                <GenericButton onPress={handleModalCancel} title='Cancel' />
            </View>
        </Modal>
    );
};

export default AssociatePatient;
