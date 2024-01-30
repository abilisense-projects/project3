import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { translationService } from "../services/translationService";
import image100 from "../assets/images/100.png";
import { globalStyles } from '../styles';
import Login from "../components/login/login";

const translate = translationService.translate;

export default function LandingScreen() {
  const navigation = useNavigation();
  const [showLoading, setShowLoading] = useState(false);

  const fadeIn = useRef(new Animated.Value(0)).current; // for fade-in animation
  const scaleValue = useRef(new Animated.Value(1)).current; // for scale animation

  useEffect(() => {
    // Start the scale animation when the component mounts
    startScaleAnimation();
  
    // Set a timer for 30 seconds to automatically hide the loading screen
    // const timer = setTimeout(() => {
    //   setShowLoading(false);
    // }, 10000);
  
    // Cleanup function
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);

  useEffect(() => {
    if (showLoading) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500, // adjust duration as needed
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500, // adjust duration as needed
        useNativeDriver: true,
      }).start();
    }
  }, [showLoading]);

  const startScaleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.09, // decrease toValue for less growth
          duration: 1000, // adjust duration for the animation speed
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000, // adjust duration for the animation speed
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const handleRegisterNowPress = () => {
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={image100} style={styles.image} resizeMode="contain" />
      </View>

      <TouchableOpacity
        style={styles.startButtonContainer}
        onPress={() => setShowLoading(true)}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.startButton,
            { transform: [{ scale: scaleValue }] }, // apply scale transform
          ]}
        >
          <Text style={styles.startButtonText}>{translate('start')}</Text>
        </Animated.View>
      </TouchableOpacity>

      {showLoading && (
        <Animated.View
          style={[styles.loadingContainer, { opacity: fadeIn }]}
          accessible={true}
        >
          <View style={globalStyles.whitePaper}>
            <Login />
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={{ color: "black" }}>
                {translate("don't have an account")}
                <Pressable onPress={handleRegisterNowPress}>
                  <Text
                    style={{
                      color: "green",
                      textDecorationLine: "underline",
                    }}
                  >
                    {translate("register here")}
                  </Text>
                </Pressable>
              </Text>
            </View>
          </View>
        </Animated.View>
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
  startButtonContainer: {
    position: "absolute",
    bottom: 20,
  },
  startButton: {
    backgroundColor: "white",
    borderRadius: 50, 
    padding: 10,
    width: 50, 
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "green",
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 150,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
