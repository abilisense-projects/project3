import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericButton from "../components/shared/button";
import { translationService } from "../services/translationService";
import { globalStyles } from '../styles';

const translate = translationService.translate;
export default function LandingScreen() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View accessible={true} style={globalStyles.whitePaper}>
      <Text>This is the Lading Page</Text>
      <GenericButton
        title={translate("login")}
        onPress={() => navigateToScreen("Login")}
        buttonWidth={80}
      />
    </View>
  );
}
