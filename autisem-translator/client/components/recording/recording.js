import React, { useState,useRef } from 'react';
import { View, Pressable, Text, StyleSheet,Animated} from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from "react-native-vector-icons/Ionicons";

let haloAnimation; // Added to store the loop instance

export default function RecordAudio(props) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const animate = useRef(new Animated.Value(0)).current; // Added for animation

  // Function to start the halo animation
  const startHaloAnimation = () => {
    haloAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(animate, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animate, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    haloAnimation.start();
  };

  // Function to stop the halo animation
  const stopHaloAnimation = () => {
    animate.setValue(0);
    haloAnimation && haloAnimation.stop(); // Stop the halo animation if it exists
  };

// const translate = translationService.translate;
  const startRecording = async () => {
    try {
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      startHaloAnimation(); // Start the halo animation
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    console.log('recording', recording);
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      props.setRecordedData(recording.getURI());
      stopHaloAnimation(); // Stop the halo animation
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

  // Animation styles for halo effect
  const haloStyle = {
    opacity: animate,
    transform: [
      {
        scale: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.4],
        }),
      },
    ],
  };

  const buttonColor = isRecording ? 'red' : 'green';

  return (
    <View style={styles.container} accessible accessibilityLabel='recording'>
      <View style={styles.haloContainer}>
        {isRecording && <Animated.View style={[styles.halo, haloStyle]} />} 
      </View>
      <Pressable
        style={[styles.recordButton, { backgroundColor: buttonColor }]}
        onPress={handleButtonPress}
      >
        <Ionicons name="mic" size={60} style={styles.icon} />
      </Pressable>
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
  icon: {
    color: "white",
    marginLeft: 4,
  },
  haloContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    position: 'absolute',
  },
});