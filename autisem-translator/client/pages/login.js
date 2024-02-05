// import React from "react";
// import { View, Text, Pressable } from "react-native";
// import Login from "../components/login/login";
// import { translationService } from "../services/translationService";
// import { globalStyles } from '../styles';
// const translate = translationService.translate;

// export default function LoginScreen({ navigation }) {
//   const handleRegisterNowPress = () => {
//     navigation.navigate("Registration");
//   };

//   return (
//     <View style={globalStyles.whitePaper}>
//       <Login />
//       <View style={{ alignItems: "center", marginTop: 20 }}>
//         <Text style={{ color: "black" }}>
//           {translate("don't have an account")}
//           <Pressable onPress={handleRegisterNowPress}>
//             <Text style={{ color: "green", textDecorationLine: "underline" }}>
//               {translate("register here")}
//             </Text>
//           </Pressable>
//         </Text>
//       </View>
//     </View>
//   );
// }
