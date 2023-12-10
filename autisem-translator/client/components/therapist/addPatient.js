import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import GenericButton from '../shared/button';

export default function AddPatient() {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputSubmit = () => {
        alert(`the patient ${inputValue} add on succes`);
        setInputValue('');
        setShowInput(false);
    };

    const handleAddPatient = () => {
        // Do something when the "Add Patient" button is pressed
        alert('Add Patient', 'The patient is added successfully');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!showInput ? (
                <TouchableOpacity onPress={handleButtonClick}>
                    <GenericButton onPress={handleButtonClick} title="Add Patient" />
                </TouchableOpacity>
            ) : (
                <View>
                    {/* buttonText: {
                        color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16,
                    }, */}
                    <TextInput
                        placeholder="enter name of patient"
                        value={inputValue}
                        onChangeText={(text) => setInputValue(text)}
                        onSubmitEditing={handleInputSubmit}
                    />
                    <TouchableOpacity onPress={handleInputSubmit}>
                        <br></br>
                        <GenericButton onPress={handleInputSubmit} title="Submit" />
                    </TouchableOpacity>
                </View>
            )}

            {/* <View>
        <GenericButton onPress={handleAddPatient} title="Add Patient" />
      </View> */}
        </View>
    );
}