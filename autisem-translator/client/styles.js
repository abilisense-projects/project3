// styles.js
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  whitePaper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 40,
    maxWidth: 300,
    alignSelf: 'center', // Center the container horizontally
    alignItems: 'center', // Center the content vertically
    justifyContent: 'center', // Center the content horizontally
  },
  // Add more global styles as needed
});
