import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import GenericButton from "../shared/button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import patientService from "../../services/backendServices/patientService";
import Icon from "react-native-vector-icons/FontAwesome";
import { translationService } from "../../services/translationService";
import { setUnreadNotification } from "../../redux/actions/patientAction";

// Translation function alias for shorter usage
const translate = translationService.translate;

export default function GetTherapst() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Therapists, setTherapists] = useState([]);
  // const countNotifications = useSelector(
  //   (state) => state.patient.num.numOfUnread
  // );
  const countNotifications = useSelector((state) => state.patient.num);
  // const countNotifications = useSelector((state) => state.patient.num?.numOfUnread);


  console.log("countNotifications:", countNotifications);

  const receiverId = useSelector((state) => state.user.user.userData._id);

  //gets therapists list by receiver id
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("receiverId 0 ", receiverId);
        const responseTherapist = await patientService.getPatientsTherapist(
          receiverId
        );
        if (responseTherapist && responseTherapist.therapists) {
          setTherapists(responseTherapist.therapists);
          // setCountNotifications(responseTherapist.count);
          console.log("response.therapists ", responseTherapist.therapists);
          // console.log("response.count ", responseTherapist.count);
        } else {
          console.error("Invalid response data:", responseTherapist);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [receiverId]);

  const handleTherapist = (therapists) => {
    setSelectedTherapist(therapists);
  };

  const handleDone = async () => {
    if (selectedTherapist) {
      const { userName, firstName, lastName } = selectedTherapist;
      const therapistData = { userName, firstName, lastName };
      const responseChange = await patientService.statusChange({
        userName: userName,
        receiverID: receiverId,
      });

      console.log("responseChange", responseChange);

      // if (countNotifications > 0) {
      if (countNotifications.numOfUnread > 0) {
        dispatch(setUnreadNotification(countNotifications.numOfUnread - 1));

        navigation.navigate("AccessOption", { therapist: therapistData });
      } else {
        navigation.navigate("AccessOption", { therapist: therapistData });
      }
    }
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
      <View style={styles.modalContainer}>
        <Text style={styles.label}>Look for therapists you know</Text>
        {countNotifications === "0" ? (
          <View style={styles.noPatientsContainer}>
            <Text style={styles.noPatientsText}>There are no new therapists</Text>
          </View>
        ) : (
          <View>
            {Therapists.map((therapist) => (
              <TouchableOpacity
                key={therapist.userName}
                onPress={() => handleTherapist(therapist)}
                style={[
                  styles.button,
                  selectedTherapist === therapist && {
                    backgroundColor: "green",
                  },
                ]}
              >
                <View style={styles.IconContainer}>
                  <Icon
                    name="user-md"
                    size={30}
                    color={selectedTherapist === therapist ? "white" : "green"}
                  />
                  <View style={styles.textContainer}>
                    <Text
                      style={{
                        color:
                          selectedTherapist === therapist ? "white" : "green",
                      }}
                    >
                      {therapist.userName}
                    </Text>
                    <Text
                      style={{
                        color:
                          selectedTherapist === therapist ? "white" : "green",
                      }}
                    >
                      {therapist.firstName} {therapist.lastName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <GenericButton onPress={handleDone} title="Done" />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  IconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 8,
  },
  noPatientsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  noPatientsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
