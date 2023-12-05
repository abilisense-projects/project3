import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);

//   useEffect(() => {
//     return () => {
//       audioRecorderPlayer.stopPlayer();
//       audioRecorderPlayer.stopRecorder();
//       audioRecorderPlayer.removePlayBackListener();
//     };
//   }, []);

  const startRecording = async () => {
    if (!isRecording) {
      try {
        console.log(audioRecorderPlayer);
        await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener(e => {
            console.log('Recording . . . ', e.currentPosition);
             return;
            });
        
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      try {
        await audioRecorderPlayer.stopRecorder();
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: isRecording ? 'red' : 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          {isRecording ? 'Stop' : 'Record'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Recorder;
