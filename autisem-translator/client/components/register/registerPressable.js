import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

const RegisterPressable = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.pressable}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginTop: 20,
    backgroundColor: 'green',  // Set the background color to blue
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  text: {
    color: 'white',  // Set the text color to white for better visibility
    textAlign: 'center',
  },
});

export default RegisterPressable;
