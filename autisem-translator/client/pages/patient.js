import React from "react";
import { View, Button, Text ,StyleSheet,Image,ImageBackground} from "react-native";
import { useSelector } from "react-redux";

// const user = useSelector((state) => state.userReucer);
const PatientScreen = () => {
  const name = useSelector((state) => state.user.user.userData.firstName);
  console.log("firstName ", name);
  const image = useSelector((state) => state.user.user.userData.image);
  console.log("image ", image);
  // Move the useSelector inside the component
  // const user = useSelector((state) => state.userReucer);

  const handleWordListPress = () => {
    return user.listOfWords; // update in DB
  };

  return (
     <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.backgroundImage} resizeMode="cover" />}
     <View style={styles.content}>
       <Text>hello {name}</Text>
       <Button title="רשימת מילים" onPress={handleWordListPress} />
     </View>
   </View>
 
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});

export default PatientScreen;


// import React from "react";
// import { View, Button, Text, StyleSheet, ImageBackground } from "react-native";
// import { useSelector } from "react-redux";

// const PatientScreen = () => {
//   const name = useSelector((state) => state.user.user.userData.firstName);
//   const image = useSelector((state) => state.user.user.userData.image);

//   const handleWordListPress = () => {
//     // פונקציה שמעדכנת את רשימת המילים במסד הנתונים
//   };

//   return (
//     <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
//       <View style={styles.content}>
//         <Text>שלום {name}</Text>
//         <Button title="רשימת מילים" onPress={handleWordListPress} />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PatientScreen;



// import React from "react";
// import { View, Button, Text, StyleSheet, ImageBackground } from "react-native";
// import { useSelector } from "react-redux";

// const PatientScreen = () => {
//   const name = useSelector((state) => state.user.user.userData.firstName);
//   const image = useSelector((state) => state.user.user.userData.image);

//   const handleWordListPress = () => {
//     // פונקציה שמעדכנת את רשימת המילים במסד הנתונים
//   };

//   return (
//     <ImageBackground source={{ uri: image }} style={styles.backgroundImage} resizeMode="cover">
//       <View style={styles.content}>
//         <Text>שלום {name}</Text>
//         <Button title="רשימת מילים" onPress={handleWordListPress} />
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // סגנונות נוספים לפי צורך
//   },
// });

// export default PatientScreen;