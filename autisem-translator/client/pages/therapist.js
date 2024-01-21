import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native';
import therapistService from '../services/backendServices/therapistService';
import GenericButton from '../components/shared/button';
import { useSelector } from 'react-redux';
import NoPatientsImage from '../assets/images/therapist room.jpg'
import AssociatePatient from '../components/therapist/associatePatient';
import BannerNotification from '../components/shared/bannerNotification';
import { globalStyles } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TherapistScreen = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isAssociatePatientModalVisible, setAssociatePatientModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const therapistId = useSelector((state) => state.user.user.userData._id);
  const navigation = useNavigation();
  const [isDisplayingPending, setIsDisplayingPending] = useState(false);

  useEffect(() => {
    fetchData();
  }, [therapistId]);

  //gets patients list by therapist id
  const fetchData = async () => {
    try {
      const patientsData = await therapistService.getTherapistPatients(therapistId);
      if (!patientsData || patientsData.length <= 0) {
        setPatients([]);
        setFilteredPatients([]);
      // } else if (patientsData.length === 1 && patientsData[0].status === 'Confirmed') {
      //   // Automatically navigate to patient details if there's only one patient and status is Confirmed
      //   navigation.navigate('PatientDetails', { patientId: patientsData[0].patientDetails._id });
      } else {
        setPatients(patientsData);
        // Display confirmed patients initially
        const confirmedPatients = patientsData.filter(patient => patient.status === 'Confirmed');
        setFilteredPatients(confirmedPatients);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const toggleDisplayPending = () => {
    setIsDisplayingPending(!isDisplayingPending);

    // Update filtered patients based on the new display mode
    const patientsToDisplay = isDisplayingPending
      ? patients.filter(patient => patient.status === 'Confirmed')
      : patients.filter(patient => patient.status === 'Pending');

    setFilteredPatients(patientsToDisplay);
  };

  //set opem modal true for entering patient's name
  const handleAddPatient = () => {
    setAssociatePatientModalVisible(true);
  };

  const handleAssociatePatientConfirm = async (patientUsername) => {
    try {
      //first check if it exist in patients
      const isUserNameExists = patients.some(patient => (
        `${patient.patientDetails.userName}` === patientUsername
      ));

      if (isUserNameExists) {
        setMessage(`This patient already exists on your list.`);
        return;
      }
      // send notification to patient
      const notificationStatus = await therapistService.sendNotificationToPatient(therapistId, patientUsername);
      if (notificationStatus === 'no such patient') {
        setBannerMessage('Failed to send notification. There is no such Patient.');
      } else {
        setBannerMessage(`Notification sent to ${patientUsername}`);
      }
    } catch (error) {
      setBannerMessage("Failed to send notification. Please try again.");
    }
    // close modal
    setAssociatePatientModalVisible(false);
  };

  const handleAssociatePatientCancel = () => {
    setAssociatePatientModalVisible(false);
  };

  const handleRemoveSinglePatient = async (patient) => {
    try {
      const deletion = await therapistService.unAssociatePatient(therapistId, patient.patientDetails._id)
      if (deletion) {
        console.log("deletion", deletion)
        // const updatedPatients = patients.filter((p) => p.patientDetails._id !== patient.patientDetails._id);
        // setPatients(updatedPatients);
        setBannerMessage(`Patient ${patient.patientDetails.firstName} ${patient.patientDetails.lastName} deleted successfully.`);
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      setBannerMessage('Failed to delete patient. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'white';
      case 'Pending':
        return 'rgba(255, 255, 0, 0.2)';
      default:
        return 'rgba(255, 0, 0, 0.2)';
    }
  };

  return (
    <View style={globalStyles.whitePaper}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {patients.length > 0 && (
            <Text style={styles.header}>My Patients</Text>
          )}
          {patients.length === 0 ? (
            <View style={styles.noPatientsContainer}>
              <Text style={styles.noPatientsText}>No patients yet</Text>
              <Image source={NoPatientsImage} style={styles.noPatientsImage} />
            </View>
          ) : (
            <FlatList
              data={filteredPatients}
              keyExtractor={(item) => item.patientDetails._id}
              renderItem={({ item }) => (
             <View style={[styles.patientContainer, { backgroundColor: getStatusColor(item.status) }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      {item.status === 'Confirmed' ? (
                        <Pressable onPress={() => navigation.navigate('PatientDetails', { patientId: item.patientDetails._id })}>
                          <Text style={styles.patientName}>{`${item.patientDetails.firstName} ${item.patientDetails.lastName}`}</Text>
                        </Pressable>
                      ) : (
                        <Text style={styles.patientName}>{`${item.patientDetails.firstName} ${item.patientDetails.lastName}`}</Text>
                      )}
                      <Pressable onPress={() => handleRemoveSinglePatient(item)}>
                        <Ionicons name='trash' style={styles.icon} />
                      </Pressable>
                    </View>
                  </View>
              )}
            />
          )}
          <GenericButton
            style={styles.addButton}
            onPress={handleAddPatient}
            title="Add Patient"
            buttonWidth={160}
          />
           <View style={styles.toggleButtonContainer}>
            <GenericButton
              style={styles.toggleButton}
              onPress={toggleDisplayPending}
              title={isDisplayingPending ? 'Show Confirmed Patients' : 'Show Pending Patients'}
              buttonWidth={250}
            />
          </View>
          <AssociatePatient
            isVisible={isAssociatePatientModalVisible}
            onConfirm={handleAssociatePatientConfirm}
            onCancel={handleAssociatePatientCancel}
            errorMessage={message}
          />
          {bannerMessage && (
            <BannerNotification
              message={bannerMessage}
              severity={bannerMessage.includes('Failed') ? 'error' : 'success'}
              onClose={() => { setBannerMessage(null), fetchData() }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  patientContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "green",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noPatientsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  noPatientsImage: {
    width: 200,
    height: 100,
  },
  icon: {
    color: 'green',
    fontSize: 24,
  },
  toggleButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default TherapistScreen;
