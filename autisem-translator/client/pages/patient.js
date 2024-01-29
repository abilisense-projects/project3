import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import GenericButton from "../components/shared/button";
import RecordAudio from "../components/recording/recording";
import patientService from "../services/backendServices/patientService";

import { setUnreadNotification } from "../redux/actions/patientAction";
import { globalStyles } from "../styles";
import recordingService from "../services/backendServices/recordingService";
const PatientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countNotifications, setCountNotifications] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [recordedData, setRecordedData] = useState(null);


  // const uploadToServer = async (patientID, translation) => {
  //   try {
  //     if (recordedData) {
  //       const response = await recordingService.uploadRecording('words/word', recordedData, patientID, translation);
  //       console.log('Recording uploaded to server', response);
  //     } else {
  //       console.warn('No recording data available.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading recording', error);
  //   }
  // };
  const receiverId = useSelector((state) => state.user.user.userData._id);

  //gets therapists list by receiver id
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("receiverId 0 ", receiverId);
        const response = await patientService.unreadNotifications(receiverId);
        if (response) {
          dispatch(setUnreadNotification(response));
          setCountNotifications(response);
          console.log("response. ", response);
        } else {
          console.log("Invalid response data - CountNotifications:", 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [receiverId, setCountNotifications]);

  const user = useSelector((state) => state.user.user.userData);
 

  if (isLoading) {
    // Display a loading indicator while the data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user.image && (
        <Image
          source={{ uri: user.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}
      <View>
        <View style={styles.hello}>
          <Text style={styles.label}>hello {user.firstName}</Text>
        </View>
        <View style={styles.recordAudio}>
        <RecordAudio setRecordedData = {setRecordedData}>  </RecordAudio>
        <Button title="Upload" onPress={() => uploadToServer('121212', 'Malky')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recordAudio: {
    marginTop: 150,
  },
  hello: {
    marginLeft: 25,
    marginTop:10,


  },
});

export default PatientScreen;


