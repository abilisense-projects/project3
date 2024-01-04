import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import GenericButton from "../components/shared/button";
import RecordAudio from "../components/recording/recording";
import { Ionicons } from "@expo/vector-icons";
import patientService from "../services/backendServices/patientService";

const PatientScreen = (countChange) => {
  const navigation = useNavigation();
  const [countNotifications, setCountNotifications] = useState(" ");

  // const { countChange } = route.params;

  const receiverId = useSelector((state) => state.user.user.userData._id);

  //gets therapists list by receiver id
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("receiverId 0 ", receiverId);
        const responseTherapist = await patientService.getPatientsTherapist(
          receiverId
        );
        if (responseTherapist) {
          setCountNotifications(responseTherapist.count);
          console.log("response.count ", responseTherapist.count);
        } else {
          console.error("Invalid response data:", responseTherapist);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // } finally {
        //   setIsLoading(false);
      }
    };
    fetchData();
  }, [receiverId]);

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

  // const countEqual = () => {
  //   if (countNotifications > countChange) {
  //     console.log("countChange: ", countChange);
  //     count = countChange;
  //   } else {
  //     count = countNotifications;
  //   }
  //   console.log("count: ", count);
  // };

  return (
    <View accessible={true}>
      <Text style={styles.label}>hello {name}</Text>

      <View style={styles.iconContainer}>
        <Ionicons
          name="notifications"
          size={30}
          color={"black"}
          onPress={handleAssociateTherapist}
        />
        {/* onPress={countEqual} */}
        {countNotifications ? (
          <View style={styles.notificationBadgeContainer}>
            <Text style={styles.notificationText}>{countNotifications}</Text>
          </View>
        ) : null}
      </View>

      {/* {countNotifications ? (
        // <View style={styles.notificationBadgeContainer}>
        // <View style={styles.notificationBadge}>
        <Text style={styles.notificationText}>{countNotifications}</Text>
      ) : // </View>
      // </View>
      null} */}

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
