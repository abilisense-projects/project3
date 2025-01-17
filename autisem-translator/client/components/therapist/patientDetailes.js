import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import therapistService from '../../services/backendServices/therapistService';
import GenericButton from '../shared/button';
import Icon from "react-native-vector-icons/FontAwesome";
import AddWordModal from './addWordModel';
import { Audio } from 'expo-av';
import { translationService } from "../../services/translationService";

const PatientDetails = ({ route }) => {
  const { patientId } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const translate = translationService.translate;

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
    setIsModalVisible(true);
    try {
      console.log("adding new word")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRecordingIconPress = async (recording) => {
    try {
      if (recording) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: recording },
          { shouldPlay: true }
        );
      } else {
        console.warn('No recording URL provided.');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : patientDetails ? (
        <View>
          <Text style={styles.title}>{`${translate('patient')}: ${patientDetails.patient.firstName} ${patientDetails.patient.lastName}`}</Text>
          {patientDetails.words.words ? (
            <View>
              <Text style={styles.subtitle}>{translate('words')}:</Text>
              <View>
                {patientDetails.words && patientDetails.words.words.map((word, index) => (
                  <View key={index} style={styles.wordContainer}>
                    <Pressable onPress={() => handleRecordingIconPress(word.firstRecording)}>
                      <Icon name="volume-up" size={20} color="green" />
                    </Pressable>
                    <Text style={styles.translationText}>{`${translate('translation')}: ${word.translation}`}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.infoText}>{translate('no words available for this patient')}</Text>
          )}
          <View style={{ margin: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <GenericButton onPress={handleAddWord} title={translate('add new word')} buttonWidth={140}></GenericButton>
          </View>
          <AddWordModal isVisible={isModalVisible} onClose={handleCloseModal} patientId={patientId} />
        </View>
      ) : (
        <Text style={styles.infoText}>{translate('no patient details available')}</Text>
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