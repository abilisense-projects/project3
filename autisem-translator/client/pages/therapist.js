import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import therapistService from '../services/backendServices/therapistService';
import GenericButton from '../components/shared/button';
import { useSelector } from 'react-redux';
import NoPatientsImage from '../assets/images/therapist room.jpg'
import AssociatePatient from '../components/therapist/associatePatient';
import BannerNotification from '../components/shared/bannerNotification';

const TherapistScreen = () => {
  const [patients, setPatients] = useState([]);
  const [isAssociatePatientModalVisible, setAssociatePatientModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bannerMessage, setBannerMessage] = useState(null);
  const therapistId = useSelector((state) => state.user.user.userData._id);

  //gets patients list by therapist id
  useEffect(() => {
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
    fetchData();
  }, [therapistId]);

  //set opem modal true for entering patient's name
  const handleAddPatient = () => {
    setAssociatePatientModalVisible(true);
  };


  const handleAssociatePatientConfirm = async (patientUsername) => {
    try {
      //send notification to patient
      await therapistService.sendNotificationToPatient(therapistId, patientUsername);
      setBannerMessage(`Notification sent to ${patientUsername}`);
    } catch (error) {
      setBannerMessage('Failed to send notification. Please try again.');
    }
    //close modal
    setAssociatePatientModalVisible(false);
  };

  const handleAssociatePatientCancel = () => {
    setAssociatePatientModalVisible(false);
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
                <View style={styles.patientContainer}>
                  <Text style={styles.patientName}>{`${item.patientDetails.firstName} ${item.patientDetails.lastName}`}</Text>
                </View>
              )}
            />
          )}
          <GenericButton style={styles.addButton} onPress={handleAddPatient} title="Add Patient" />
          <AssociatePatient
            isVisible={isAssociatePatientModalVisible}
            onConfirm={handleAssociatePatientConfirm}
            onCancel={handleAssociatePatientCancel}
          />
          {bannerMessage && (
            <BannerNotification
              message={bannerMessage}
              severity={bannerMessage.includes('Failed') ? 'error' : 'success'}
              onClose={() => setBannerMessage(null)}
            />
          )}
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