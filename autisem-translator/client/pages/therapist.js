import React from 'react';
import { View } from 'react-native';
import ListOfPatients from '../components/therapist/listOfPatients';
import AddPatient from '../components/therapist/addPatient';
import ListOfPatient from '../components/therapist/listOfPatient';
import RemoveButton from '../components/therapist/removePatient';
import PatientListItem from '../components/therapist/PatientListItem';
import App from '../App';

export default function TherapistScreen() {
    return (
        <View>
            <ListOfPatients></ListOfPatients>
            {/* <RemoveButton></RemoveButton>
            <App></App>
            <PatientListItem></PatientListItem> */}
            <AddPatient></AddPatient>
        </View>
    );

}