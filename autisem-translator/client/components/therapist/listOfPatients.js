import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PatientList = ({ patients, onRemovePress }) => {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={() => onRemovePress(item.id)}>
        <Icon name="trash-2" size={20} color="green" />
      </TouchableOpacity>
      <Text>{item.name}</Text>
    </View>
  );
  const renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: 'gray', marginVertical: 5 }} />
  );
  
  return (
    <FlatList
      data={patients}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};
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
    // alert(patientId.name)
    const removedPatient = patients.find((patient) => patient.id === patientId);
    if (removedPatient) {
      alert(`${removedPatient.name} is removed`);
    } else {
      alert('Patient not found');
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PatientList patients={patients} onRemovePress={handleRemovePatient} />
    </View>
  );
};

export default App;
