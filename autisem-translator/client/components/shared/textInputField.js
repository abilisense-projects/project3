import React from 'react';
import { StyleSheet,Text, TextInput, View } from 'react-native';

const TextInputField = ({ value, onChangeText, placeholder,secure,error}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: error ? 'red' : '#ccc' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
     marginBottom: 15,
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
  error: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
  }
});
export default TextInputField;