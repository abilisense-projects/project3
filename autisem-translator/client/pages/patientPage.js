import React from 'react';
import { View,Button,Text } from 'react-native';
import { useSelector } from 'react-redux';


const PatientPage = () => {
    const user = useSelector(state => state.userReucer);
    const handleWordListPress = () => {
        return user.listOfWords;// update in DB
    };

    return (
        <View accessible={true}>
            {/* <Button
                title="רשימת מילים"
                onPress={handleWordListPress}
            /> */}
            <Text>Hello</Text>
        </View>
    );
};

export default PatientPage;