import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Hamburger from './components/side_bar/hamburger'

export default function App() {
  return (
    <View style={styles.container}>
      <Hamburger/>
    </View>
  );
}
//name of fanction.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
