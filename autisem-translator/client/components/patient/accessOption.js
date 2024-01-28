import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import patientService from "../../services/backendServices/patientService";
import BannerNotification from "../shared/bannerNotification";

export default function AccessOption() {
  const navigation = useNavigation();
  const receiverId = useSelector((state) => state.user.user.userData._id);
  const [bannerMessage, setBannerMessage] = useState(null);

  const route = useRoute();
  const { therapist } = route.params || {};

  const handleModalCancel = async () => {
    // navigation.navigate("GetTherapist");
    navigation.reset({
      index: 0,
      routes: [{ name: "GetTherapist" }]
    });
  };

  const handleModalOk = async () => {
    const responseChange = await patientService.statusChange({
      id: therapist.id,
      receiverID: receiverId,
    });

    console.log("responseChange", responseChange);


    const response = await patientService.statusChangeToConfirmed({
      id: therapist.id,
      receiverID: receiverId,
    });
    console.log("response", response);
    //here show banner
    setBannerMessage(
      `Therapist ${therapist.firstName} ${therapist.lastName} added successfully.`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {therapist && (
          <>
            <Text style={styles.label}>
              <Text style={{ color: "green" }}>
                {`${therapist.firstName} ${therapist.lastName} `}
              </Text>
              wants to access your Abilisense account
            </Text>
            <Text>
              This will allow
              <Text style={{ color: "green" }}>
                {` ${therapist.firstName} ${therapist.lastName} `}
              </Text>
              to perform operations on your Abilisense account
            </Text>
            <Text>
              It is possible that your sensitive information will be shared with
              the
              <Text style={{ color: "green" }}>
                {` ${therapist.firstName} ${therapist.lastName}`}
              </Text>
              .
            </Text>
            <Text>You can always add or remove access.</Text>
          </>
        )}
        <View style={styles.buttonContainer}>
          <GenericButton
            onPress={handleModalCancel}
            title="Cancel"
            buttonWidth={80}
          />
          <View style={styles.buttonSpacer} />
          <GenericButton
            onPress={handleModalOk}
            title="Allow"
            buttonWidth={80}
          />
        </View>
        {bannerMessage && (
          <BannerNotification
            message={bannerMessage}
            severity={bannerMessage.includes("Failed") ? "error" : "success"}
            onClose={() => {
              setBannerMessage(null),
                navigation.reset({
                  index: 0,
                  routes: [{ name: "GetTherapist" }]
                });
            }}
          />
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
  buttonContainer: {
    flexDirection: "row", // Set the direction to row
    justifyContent: "center", // Adjust as needed
  },
  buttonSpacer: {
    width: 20, // Adjust as needed for the desired space
  },
});
