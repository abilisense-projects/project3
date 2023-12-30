import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, AccessibilityInfo } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TextInputField = ({ value, onChangeText, placeholder, secure, error }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    // Announce the change of state to screen readers
    AccessibilityInfo.announceForAccessibility(passwordVisible ? 'Password hidden' : 'Password visible');
  };

  const getBorderColor = () => {
    return error ? 'red' : value && !error ? 'green' : '#ccc';
  }

  return (
    <View style={styles.container} accessible>
      <TextInput
        style={[styles.input, { borderColor: getBorderColor() }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible && secure}
        accessibilityLabel={placeholder}
        accessibilityHint={secure ? 'Enter your password' : 'Enter text'}
      />
      {secure && (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
          accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
          accessibilityHint='Tap to toggle password visibility'
        >
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
    marginBottom: 5,
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 8,
    fontSize: 16,
    padding: 10, // Ensure padding for better touch target size
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
});

export default TextInputField;
