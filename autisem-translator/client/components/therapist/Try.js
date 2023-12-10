// App.js
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PatientListItem from './PatientListItem';
import RemoveButton from './RemoveButton';

const App = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: 'adi', isInList: true },
    { id: 2, name: 'ori', isInList: false },
    { id: 3, name: 'yarden', isInList: false },
    { id: 4, name: 'talya', isInList: false },
    { id: 5, name: 'hila', isInList: false },
  ]);

  const handleRemovePatient = (patientId) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId ? { ...patient, isInList: false } : patient
      )
    );

    const removedPatient = patients.find((patient) => patient.id === patientId);
    if (removedPatient) {
      Alert.alert('Patient Removed', `${removedPatient.name} has been removed`);
    } else {
      Alert.alert('Patient Not Found', 'Patient not found');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {patients.map((patient) => (
        <PatientListItem key={patient.id} item={patient} onRemovePress={handleRemovePatient} />
      ))}
      <RemoveButton onPress={() =>handleRemovePatient} />
    </View>
  );
};

export default App;
