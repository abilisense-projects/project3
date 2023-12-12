import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import RecordAudio from './components/recording/recording';
import { useState } from 'react';
import backendService from './services/backend_service';
export default function App() {
  const [recordedData, setRecordedData] = useState(null);


  const uploadToServer = async () => {
    try {
      if (recordedData) {
        const response = await backendService.uploadRecording('patient/uploadRecording', recordedData);
        console.log('Recording uploaded to server', response);
      } else {
        console.warn('No recording data available.');
      }
    } catch (error) {
      console.error('Error uploading recording', error);
    }
  };  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <RecordAudio setRecordedData = {setRecordedData}>  </RecordAudio>
      <Button onPress={uploadToServer}>שליחה לשרת</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
