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
import { translationService } from "../services/translationService";
import recordingService from "../services/backendServices/recordingService";

const translate = translationService.translate;

const PatientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const translate = translationService.translate;
  const [countNotifications, setCountNotifications] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [recordedData, setRecordedData] = useState(null);


  const receiverId = useSelector((state) => state.user.user.userData._id);

  //gets therapists list by receiver id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await patientService.unreadNotifications(receiverId);
        if (response) {
          dispatch(setUnreadNotification(response));
          setCountNotifications(response);
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
  const uploadToServer = async (recordedData) => {
    try {
      const response = await recordingService.translateWord(recordedData);
      console.log("Recordings uploaded to server", response);
    } catch (error) {
      console.error("Error uploading recordings", error);
    }
  }

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
          <Text style={styles.label}>{translate("hello")}{user.firstName}</Text>
        </View>
        <View style={styles.recordAudio}>
        <RecordAudio setRecordedData = {setRecordedData}>  </RecordAudio>
        <Button title={translate("upload")} onPress={() => uploadToServer(recordedData)} />
        
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
    color: 'green',
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


