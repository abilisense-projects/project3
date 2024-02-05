// import React from "react";
// import { View } from "react-native";
// import ForgotYourPassword from "../components/login/forgotYourPassword";

// export default function ForgotPassword() {
//   return (
//     <View accessible={true}> 
//       <ForgotYourPassword></ForgotYourPassword>
//     </View>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Image, Animated, Dimensions} from "react-native";
import * as Animatable from "react-native-animatable";

import image100 from "../assets/images/100.png";

import CodeFromTheEmail from "../components/login/codeFromTheEmail"; 


const windowHeight = Dimensions.get('window').height;

export default function CodeFromEmail() {

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
           <CodeFromTheEmail /> 
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

