import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, Image, ImageBackground ,ActivityIndicator  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import GenericButton from "../components/shared/button";
import RecordAudio from "../components/recording/recording";
import { Ionicons } from "@expo/vector-icons";
import patientService from "../services/backendServices/patientService";
import SideNavigator from "../components/drawer/side";
import { setUnreadNotification } from "../redux/actions/patientAction";
import { globalStyles } from "../styles";

const PatientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countNotifications, setCountNotifications] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);

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
          // console.error("Invalid response data:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
      }
    };
    fetchData();
  }, [receiverId, setCountNotifications]);

  const name = useSelector((state) => state.user.user.userData.firstName);
  console.log("firstName ", name);
  const image = useSelector((state) => state.user.user.userData.image);
  console.log("image ", image);

  // Move the useSelector inside the component
  const user = useSelector((state) => state.userReucer);

  const handleWordListPress = () => {
    return user.listOfWords; // update in DB
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
    // <View accessible={true} style={globalStyles.whitePaper}>
    //   <Text style={styles.label}>Hello {name}</Text>

    //   {/* <Button title="רשימת מילים" onPress={handleWordListPress} /> */}

      
    // </View>
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.backgroundImage} resizeMode="cover" />}
     <View >
       <Text style={styles.label}>hello {name}</Text>
       <Button title="רשימת מילים" onPress={handleWordListPress} /> 
       <RecordAudio />
     </View>
   </View>
  );
};

export default PatientScreen;

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 20,
//     // alignSelf: "flex-end",
//     marginBottom: 15,
//   },
//   notificationBadgeContainer: {
//     position: "absolute",
//     zIndex: 1,
//     backgroundColor: "green",
//     borderRadius: 10,
//     width: 15,
//     height: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   iconContainer: {
//     position: "relative",
//     width: 30,
//   },

//   notificationText: {
//     color: "white",
//     fontSize: 12,
//   },
// });

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  label: {
        fontSize: 20,
        // alignSelf: "flex-end",
        marginBottom: 15,
  },
  loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
});

