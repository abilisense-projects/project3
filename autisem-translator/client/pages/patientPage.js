import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const user = useSelector(state => state.userReucer);
const PatientPage = () => {
    const handleWordListPress = () => {
        return user.listOfWords;// update in DB
    };

    return (
        <View accessible={true}>
            <Button
                title="רשימת מילים"
                onPress={handleWordListPress}
            />
        </View>
    );
};

export default PatientPage;