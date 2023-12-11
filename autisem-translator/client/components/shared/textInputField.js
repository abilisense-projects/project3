import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TextInputField = ({ value, onChangeText, placeholder, secure, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: error ? 'red' : '#ccc' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible && secure}
      />
      {secure && (
        <Pressable onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <MaterialCommunityIcons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#ccc"
          />
        </Pressable>
      )}
      {error && <Text style={styles.error}>{error.message}</Text>}
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
    right: 10,
    top: 18,
  },
  error: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
  },
});

export default TextInputField;
