import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const GenericButton = ({ onPress, title, isDisabled }) => {
  return (
    <Pressable
      style={[styles.button, { opacity: isDisabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={isDisabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={title}
      accessibilityHint={`Tap to ${title}`}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12, // Added for better touch target size
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GenericButton;
