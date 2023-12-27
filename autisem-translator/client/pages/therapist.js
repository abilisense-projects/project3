import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import therapistService from '../services/backendServices/therapistService';
import GenericButton from '../components/shared/button';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import NoPatientsImage from '../assets/images/therapist room.jpg'

const TherapistScreen = () => {
  const [patients, setPatients] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPatientUsername, setNewPatientUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const therapistId = useSelector((state) => state.user.user.userData._id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await therapistService.getTherapistPatients(therapistId);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchData();
  }, [therapistId]);

  const handleAddPatient = async () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (newPatientUsername.trim() !== '') {
      // You can implement logic to add a new patient here
      // For simplicity, let's show an alert for demonstration
      console.log("add", newPatientUsername)
      //   Alert.alert('Add Patient', `Patient ${newPatientUsername} added.`);
      setNewPatientUsername('');
      setModalVisible(false);
    } else {
      console.log('Invalid Username', 'Please enter a valid username.')
      //Alert.alert('Invalid Username', 'Please enter a valid username.');
    }
  };

  const handleModalCancel = () => {
    setNewPatientUsername('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {patients.length > 0 && (
            <Text style={styles.header}>My Patients</Text>
          )}
          {/* this is showing for a second when there are patients why? */}
          {patients.length === 0 ? (
            <View style={styles.noPatientsContainer}>
              <Text style={styles.noPatientsText}>No patients yet</Text>
              <Image source={NoPatientsImage} style={styles.noPatientsImage} />
            </View>
          ) : (
            <FlatList
              data={patients}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.patientContainer}>
                  <Text style={styles.patientName}>{`${item.firstName} ${item.lastName}`}</Text>
                </View>
              )}
            />
          )}
          <GenericButton style={styles.addButton} onPress={handleAddPatient} title="Add Patient" />

          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter patient username"
                value={newPatientUsername}
                onChangeText={(text) => setNewPatientUsername(text)}
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={handleModalOk}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleModalCancel}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  patientContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noPatientsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  noPatientsImage: {
    width: 400,
    height: 200,
  },
});

export default TherapistScreen;