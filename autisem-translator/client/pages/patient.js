import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
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
import WordTranslationModal from "../components/patient/wordTranslationModal";


const translate = translationService.translate;

const PatientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countNotifications, setCountNotifications] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [recordedData, setRecordedData] = useState(null);
  const [ModalVisible, setModalVisible] = useState(false);
  const [translationResponse, setTranslationResponse] = useState(null);




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
      setTranslationResponse(response); // Set the translation response
      handleAddPatient(); // Open the modal
    } catch (error) {
      console.error("Error uploading recordings", error);
    }
  }

  const user = useSelector((state) => state.user.user.userData);

  //set opem modal true for entering patient's name
  const handleAddPatient = () => {
    setModalVisible(true);
  };

  const handleAssociatePatientCancel = () => {
    setModalVisible(false);
  };
 

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
        </View>

        <View style={styles.centeredButton}>
          <GenericButton title={translate("upload")} 
          onPress={() => uploadToServer(recordedData)}
          buttonWidth={80}></GenericButton>
        </View>

        <WordTranslationModal
              isVisible={ModalVisible}
              onCancel={handleAssociatePatientCancel}
              translationResponse={translationResponse} // Pass the translation response
            />
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
  centeredButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust this value as needed
  },
});

export default PatientScreen;





