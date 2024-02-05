import React, { useState, useEffect , useRef } from "react";
import { View, StyleSheet, Text, Pressable, Image, Animated, Dimensions} from "react-native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { useNavigation } from "@react-navigation/native";
import sendTheEmailService from "../../services/backendServices/sendTheEmailService";
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
    color: "red",
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

// Form fields configuration
const fields = [
  {
    name: "Code",
    state: "code",
    placeholder: translate("enter your code"),
    type: "text",
    rules: validations.code.client,
    accesabilityLabel: "verification code input",
    accesabilityHint: "enter the code you received in your email",
  },
];

// Component function to handle verification code from email
export default function CodeFromTheEmail(userName) {
  // Navigation hook for navigation functions
  const navigation = useNavigation();

  // State variables for managing component state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State variables for handling button disablement and timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disableUntil, setDisableUntil] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

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

  // Form submission handler
  const onSubmit = (data) => {
    HandleVerification(data);
  };

  // Effect hook for managing button disablement and timer updates
  useEffect(() => {
    if (disableUntil > 0) {
      setIsButtonDisabled(true);

      // Calculate the remaining time until the button is enabled
      const remainingTime = disableUntil - new Date().getTime();
      setRemainingTime(remainingTime);

      // Set a timeout to update the remaining time
      const timeoutId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);

      // Set a timeout to enable the button when the timer expires
      const enableTimeoutId = setTimeout(() => {
        setIsButtonDisabled(false);
        setDisableUntil(0);
        clearInterval(timeoutId); // Clear the countdown interval
      }, remainingTime);

      // Clear the timeout when the component is unmounted
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(enableTimeoutId);
      };
    }
  }, [disableUntil]);

  // Verification code handling function
  const HandleVerification = async (data) => {
    try {
      // Set loading state to true to indicate that the code is being verified
      setIsLoading(true);

      // Send the verification code to the server for validation
      const response = await sendTheEmailService.createCodeFromEmail({
        code: data.Code,
      });

      // Validate the server response
      const validationResult = validations.code.server.validate(response);

      if (validationResult !== true) {
        // Set the error state with the validation message
        setError(validationResult);

        if (response.disableUntil) {
          // Update the state to disable the button and set the disableUntil time
          setDisableUntil(response.disableUntil);
        }
      } else {
        // Reset the error state if the validation passes
        setError(null);
        // Code is valid, navigate to the next screen
        navigation.navigate("NewPassword", { userName });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    } finally {
      // Set loading state to false after the validation is complete
      setIsLoading(false);
    }
  };

  // Navigation function for handling "Forgot Password" press
  const handleForgotPasswordPress = () => {
    // navigation.navigate("ForgotYourPassword");
    navigation.reset({
      index: 0,
      routes: [{ name: "ForgotYourPassword" }]
    });
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

        
    <View  style={globalStyles.whitePaper} accessible accesabilityLabel='verification code screen'>

      {/* GenericForm component for entering verification code */}
      <GenericForm
      accessible={true}

        fields={fields}
        onSubmit={onSubmit}
        submitButton={
          disableUntil
            ? translate("try later")
            : isLoading
            ? translate("verifying")
            : translate("next")
        }
        disabledButton={isLoading || isButtonDisabled}
      ></GenericForm>

      {/* Link to navigate to the "Forgot Password" screen */}
      <Pressable onPress={handleForgotPasswordPress}>
        <Text style={{ color: "blue" }}>No email sent?</Text>
      </Pressable>

      {/* Display error message if there is an error */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Display remaining time if the button is disabled */}
      {disableUntil > 0 && (
        <Text style={{ marginTop: 10 }}>
          Time remaining: {Math.floor(remainingTime / 60000)} minutes and{" "}
          {Math.ceil((remainingTime % 60000) / 1000)} seconds
        </Text>
      )}
    </View>
  </Animatable.View>
      )}
    </View>
  );
}
