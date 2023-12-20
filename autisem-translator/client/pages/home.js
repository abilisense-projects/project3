import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../components/shared/button";
import TherapistService from "../services/backendServices/therapistService";
import { translationService } from "../services/translationService";
import PatientService from "../services/backendServices/patientService";
const translate = translationService.translate;
export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View accessible={true}>
      <GenericButton
        title={translate('login')}
        onPress={() => navigateToScreen("Login")}
      />
      {/* <Button
        title="details"
        onPress={() => TherapistService.getTherapistDetails()}
      /> */}
      {/* <Button
        title="Record"
        onPress={() => navigateToScreen("Record")}
      /> */}
    </View>
  );
}
