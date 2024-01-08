import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import GenericButton from "../components/shared/button";
import RecordAudio from "../components/recording/recording";
import { Ionicons } from "@expo/vector-icons";
import patientService from "../services/backendServices/patientService";
import SideNavigator from "../components/drawer/side";
import { setUnreadNotification } from "../redux/actions/patientAction";

const PatientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [countNotifications, setCountNotifications] = useState(" ");

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
        // } finally {
        //   setIsLoading(false);
      }
    };
    fetchData();
  }, [receiverId, setCountNotifications]);

  const name = useSelector((state) => state.user.user.userData.firstName);
  console.log("firstName ", name);

  const handleAssociateTherapist = () => {
    navigation.navigate("AssociateTherapist");
  };

  // Move the useSelector inside the component
  const user = useSelector((state) => state.userReucer);

  const handleWordListPress = () => {
    return user.listOfWords; // update in DB
  };

  return (
    <View accessible={true}>
      <Text style={styles.label}>hello {name}</Text>

      {/* <SideNavigator
        navigation={navigation}
        countNotifications={countNotifications}  // Pass countNotifications as a prop
      />  */}

      {/* <View style={styles.iconContainer}>
        <Ionicons
          name="notifications"
          size={30}
          color={"black"}
          onPress={handleAssociateTherapist}
        />
        
        {countNotifications ? (
          <View style={styles.notificationBadgeContainer}>
            <Text style={styles.notificationText}>{countNotifications}</Text>
          </View>
        ) : null}
      </View> */}

      {/* <Button title="רשימת מילים" onPress={handleWordListPress} /> */}
      {/* <GenericButton onPress={handleAssociateTherapist} title="message" /> */}
      {/* <RecordAudio /> */}
    </View>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 15,
  },
  notificationBadgeContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "green",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    position: "relative",
    width: 30,
  },

  notificationText: {
    color: "white",
    fontSize: 12,
  },
});
