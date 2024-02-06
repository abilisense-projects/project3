import React, { useState,useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Animated, Dimensions } from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import UserService from "../../services/backendServices/userService";
import { translationService } from "../../services/translationService";
import { globalStyles } from "../../styles";
import * as Animatable from "react-native-animatable";
import image100 from "../../assets/images/100.png";

const windowHeight = Dimensions.get('window').height;

// Translation function alias for shorter usage
const translate = translationService.translate;

// StyleSheet for styling components
const styles = StyleSheet.create({
  errorText: {
    // color: "red",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-start",
  },

  image: {
    width: 250,
    height: 150,
    marginTop: 12,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Form fields configuration for new password entry
const fields = [
  {
    name: "password",
    placeholder: translate("new password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
    accesabilityLabel: "password input",
    accesabilityHint: "enter your password",
  },
  {
    name: "repeatPassword",
    placeholder: translate("verify password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.repeatPassword,
    accesabilityLabel: "password verification input",
    accesabilityHint: "verify your password",
  },
];

// Component function for handling password update
export default function NewPassword({ route }) {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variable for displaying success message
  const [message, setMessage] = useState(null);

  const [showLoading, setShowLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current; // for fade-in animation
  const translateY = useRef(new Animated.Value(0)).current; // for translation animation


  useEffect(() => {

    setShowLoading(true);
    
}, []);

useEffect(() => {
  if (showLoading) {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: -windowHeight * 0.37,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
}, [showLoading]);

  // Form submission handler for updating the password
  const onSubmit = async (data) => {
    try {
      // Extract the userName from the route parameters
      const { userName } = route.params;
      // Call the backend service to update the user's password
      const response = await UserService.updateUsersPassword({
        userName: userName.route.params.userName,
        newPassword: data.repeatPassword,
      });
      // Check the response from the server
      if (response.message === "Success update") {
        // Set a success message to be displayed
        navigation.reset({
          index: 0,
          routes: [{ name: "Landing" }]
        });
      } else {
        setMessage("Update password failed");
      }
    } catch (error) {
      // Log and handle errors, e.g., display an error message to the user
      console.error("Error updating password:", error);
    }
  };

  // Render the component
  return (
    <View style={styles.container}>

      <Image
        source={image100}
        style={[
          styles.image,
        ]}
        resizeMode="contain"
      />
      

      {showLoading && (
        <Animatable.View
          animation="slideInUp" // You can choose the animation type
          duration={1000} // Animation duration
          style={[
            styles.loadingContainer,
            { opacity: fadeIn, height: windowHeight * 0.75 },
          ]}
          accessible={true}
        >



    <View style={globalStyles.whitePaper} accessible accesabilityLabel='new password screen'>
      {/* GenericForm component for entering and verifying the new password */}
      <GenericForm
        accessible={true}
        accesabilityLabel="new password screen"
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("save")}
      ></GenericForm>

      {/* Display success message if the password is updated successfully */}
      <Text style={styles.errorText} accessible accessibilityLabel="reset password">{message}</Text>
    </View>

    </Animatable.View>
      )}
    </View>
  );
}
