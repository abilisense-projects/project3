import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import backendService from '../../services/backend_service';

export default function RecordAudio() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);


  const startRecording = async () => {
    try {
      console.log('Recording started');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      console.log('Recording stopped');
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }

  };

  // This is a function for the development!!!
  const playRecording = async () => {

    const soundObject = new Audio.Sound();

    const source = recording.getURI()

    await soundObject.loadAsync({ uri: source });
    await soundObject.playAsync();
  };
  //************************************* */

  const handleButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };


  const buttonColor = isRecording ? 'green' : 'red';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, { backgroundColor: buttonColor }]}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
