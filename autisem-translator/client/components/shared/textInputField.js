import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TextInputField = ({ value, onChangeText, placeholder, secure, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getBorderColor = () => {
    return error ? 'red' :  value && !error ? 'green' : '#ccc';
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: getBorderColor() }]}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible && secure}
      />
      {secure && (
        <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="#ccc"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 23,
  },
});

export default TextInputField;