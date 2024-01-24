import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import therapistService from '../../services/backendServices/therapistService';
import GenericButton from '../shared/button';
import Icon from "react-native-vector-icons/FontAwesome";


const PatientDetails = ({ route }) => {
  const { patientId } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [patientId]);

  const fetchData = async () => {
    try {
      const details = await therapistService.getPatientsDetailes(patientId);
      setPatientDetails(details);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWord = async () => {
    try {
      console.log("adding new word")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRecordingIconPress = (recording) => {
    // Log the recording or perform any other action
    console.log('Clicked on recording icon. Recording:', recording);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : patientDetails ? (
        <View>
          <Text style={styles.title}>{`Patient: ${patientDetails.patient.firstName} ${patientDetails.patient.lastName}`}</Text>
          {patientDetails.words.words ? (
            <View>
              <Text style={styles.subtitle}>Words:</Text>
              <View>
                {patientDetails.words && patientDetails.words.words.map((word, index) => (
                  <View key={index} style={styles.wordContainer}>
                    <Pressable onPress={() => handleRecordingIconPress(word.recording)}>
                      <Icon name="microphone" size={20} color="green" />
                    </Pressable>
                    <Text style={styles.translationText}>{`Translation: ${word.translation}`}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>No words available for this patient</Text>
          )}
          <GenericButton onPress={handleAddWord} title='Add new word' buttonWidth={120}></GenericButton>
        </View>
      ) : (
        <Text style={styles.infoText}>No patient details available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 170,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  wordContainer: {
    flexDirection: 'row', // Make children align horizontally
    alignItems: 'center', 
    marginBottom: 10,
  },
  translationText: {
    marginLeft: 15, // Add margin between icon and text
  },
  infoText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default PatientDetails;
