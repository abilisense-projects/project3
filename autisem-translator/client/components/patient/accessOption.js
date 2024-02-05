import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import GenericButton from "../shared/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import patientService from "../../services/backendServices/patientService";
import BannerNotification from "../shared/bannerNotification";
import { translationService } from "../../services/translationService";

const translate = translationService.translate;


export default function AccessOption() {
  const navigation = useNavigation();
  const receiverId = useSelector((state) => state.user.user.userData._id);
  const [bannerMessage, setBannerMessage] = useState(null);

  const route = useRoute();
  const { therapist } = route.params || {};

  const handleModalCancel = async () => {
    const responseChange = await patientService.statusChangeToRead({
      id: therapist.id,
      receiverID: receiverId,
    });

    const response = await patientService.associationStatusChange(
       therapist.id,
       receiverId,
       "Canceled"
    );

    // navigation.navigate("GetTherapist");
    navigation.reset({
      index: 0,
      routes: [{ name: "GetTherapist" }]
    });
  };

  const handleModalOk = async () => {
    const responseChange = await patientService.statusChangeToRead({
      id: therapist.id,
      receiverID: receiverId,
    });

    const response = await patientService.associationStatusChange(
      therapist.id,
      receiverId,
      "Confirmed");
    //here show banner
    setBannerMessage(
      `${translate("therapist")} ${therapist.firstName} ${therapist.lastName} ${translate("added successfully")}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {therapist && (
          <>
            <Text style={styles.label}>
              {translate("the therapist")}
              <Text style={{ color: "green" }}>
                {`${therapist.firstName} ${therapist.lastName} `}
              </Text>
              {translate("wants to access your Abilisense account")}
            </Text>
            <Text>
            {translate("this will allow")}
              <Text style={{ color: "green" }}>
                {` ${therapist.firstName} ${therapist.lastName} `}
              </Text>
              {translate("to perform operations on your Abilisense account")}
            </Text>
            <Text>
            {translate("it is possible that your sensitive information will be shared with the")}
              <Text style={{ color: "green" }}>
                {` ${therapist.firstName} ${therapist.lastName}`}
              </Text>
              .
            </Text>
            <Text>{translate("you can always add or remove access")}</Text>
          </>
        )}
        <View style={styles.buttonContainer}>
          <GenericButton
            onPress={handleModalCancel}
            title={translate("cancel")}
            buttonWidth={80}
          />
          <View style={styles.buttonSpacer} />
          <GenericButton
            onPress={handleModalOk}
            title={translate("allow")}
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
                  routes: [{ name: "ListOfAssociatedTherapists" }]
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
