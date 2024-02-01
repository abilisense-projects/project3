import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import { translationService } from "../services/translationService";
import image100 from "../assets/images/100.png";
import { globalStyles } from '../styles';
import Login from "../components/login/login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import UserService from "../services/backendServices/userService";

const translate = translationService.translate;

const windowHeight = Dimensions.get('window').height;

export default function LandingScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showLoading, setShowLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current; // for fade-in animation
  const scaleValue = useRef(new Animated.Value(1)).current; // for scale animation
  const translateY = useRef(new Animated.Value(0)).current; // for translation animation
  
//Connecting, using async storage
const checkLogin = async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');
  //Checking whether the user information exists in async storage
  if (username && password) {
    try {
      const data = { userName: username, password: password };
      const response = await UserService.loginUser(data);
      if (response.message === "User exists") {
        dispatch(setUser({ ...response.user.user, _id: response.user.user._id }));
        if (response.user.user.type === "therapist") {
          navigation.navigate("Therapist");
        } else {
          navigation.navigate("Patient");
        }
      } 
    } catch (error) {
      console.error("Error:", error);
      setShowLoading(true); 
    }
  } else {
    setShowLoading(true); // If there is no data, the login screen is displayed
  }
};


  useEffect(() => {
    checkLogin();
    // Start the scale animation when the component mounts
    startScaleAnimation();

    // Display login screen after 3 seconds
    const timeoutId = setTimeout(() => {
      setShowLoading(true);
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
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

  const startScaleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.09,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Animatable.Image
          source={image100}
          style={styles.image}
          resizeMode="contain"
          animation="bounceIn" // You can choose the animation type
          duration={2000} // Animation duration
        />
      </Animated.View>

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
          <View style={globalStyles.whitePaper}>
            <Login />
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ color: "black" }}>
                {translate("don't have an account")}
                <Text
                  style={{
                    color: "green",
                    textDecorationLine: "underline",
                  }}
                  onPress={() => navigation.navigate("Registration")}
                >
                  {translate("register here")}
                </Text>
              </Text>
            </View>
          </View>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 250,
    height: 150,
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
