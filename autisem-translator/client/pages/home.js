import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../components/shared/button";
import UserService from "../services/backendServices/userService";
import { translationService } from "../services/translationService";
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
        onPress={() => UserService.getUserDetails()}
      /> */}
      {/* <Button
        title="Record"
        onPress={() => navigateToScreen("Record")}
      /> */}
    </View>
  );
}
