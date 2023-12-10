import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TherapistScreen from './pages/therapist';

// import Recorder from './components/recording/recording';
// import RecordAudio from './components/recording/recording';


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <TherapistScreen></TherapistScreen>
      {/* <RecordAudio></RecordAudio> */}
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
