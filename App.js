import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import AnimalSelection from './assets/components/AnimalSelection';

export default function App() {
  return (
    <>
    <View style={styles.header}>
      <Text>Choose your pets</Text>
      <StatusBar style="auto" />
    </View>
    <AnimalSelection/>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    textAlign: 'center',
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});