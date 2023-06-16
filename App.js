import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InkFish from './assets/components/InkFish';

export default function App() {
  return (
    <>
    <View style={styles.container}>
      <Text>Choose your pets</Text>
      <StatusBar style="auto" />
    </View>
    <InkFish />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
