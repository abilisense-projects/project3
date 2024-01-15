import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity } from 'react-native';
import therapistService from '../services/backendServices/therapistService';
import GenericButton from '../components/shared/button';
import { useSelector } from 'react-redux';
import NoPatientsImage from '../assets/images/therapist room.jpg'
import AssociatePatient from '../components/therapist/associatePatient';
import BannerNotification from '../components/shared/bannerNotification';
import { globalStyles } from '../styles';
import { Ionicons } from '@expo/vector-icons';

const TherapistScreen = () => {
  const [patients, setPatients] = useState([]);
  const [isAssociatePatientModalVisible, setAssociatePatientModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerMessage, setBannerMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const therapistId = useSelector((state) => state.user.user.userData._id);

  useEffect(() => {
    fetchData();
  }, [therapistId]);

  //gets patients list by therapist id
  const fetchData = async () => {
    try {
      const patientsData = await therapistService.getTherapistPatients(therapistId);
      if (!patientsData || patientsData.length <= 0) {
        setPatients([]);
      } else {
        setPatients(patientsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  //set opem modal true for entering patient's name
  const handleAddPatient = () => {
    setAssociatePatientModalVisible(true);
  };

  const handleAssociatePatientConfirm = async (patientUsername) => {
    try {
      //first check if it exist in patients
      const isUserNameExists = patients.some(patient => (
        `${patient.patientDetails.userName}`=== patientUsername
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

  const handleRemoveSinglePatient = (patient) => {
    try {
      // const updatedPatients = patients.filter((p) => p.patientDetails._id !== patient.patientDetails._id);
      // setPatients(updatedPatients);
      setBannerMessage(`Patient ${patient.patientDetails.firstName} ${patient.patientDetails.lastName} deleted successfully.`);
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
              data={patients}
              keyExtractor={(item) => item.patientDetails._id}
              renderItem={({ item }) => (
                <View style={[styles.patientContainer, { backgroundColor: getStatusColor(item.status) }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.patientName}>{`${item.patientDetails.firstName} ${item.patientDetails.lastName}`}</Text>
                  <TouchableOpacity onPress={() => handleRemoveSinglePatient(item)}>
                    <Ionicons name='trash' style={styles.icon}/>
                  </TouchableOpacity>
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
    color:'green',
    fontSize: 24,
  },
});

export default TherapistScreen;
