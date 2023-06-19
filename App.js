import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './screens/LoginPage';
import AnimalSelection from './screens/AnimalSelection';
import HomePage from './screens/HomePage';
import RewardsPage from './screens/RewardsPage';
import ProfilePage from './screens/ProfilePage';
import FriendsPage from './screens/FriendsPage';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(
  ['Scripts "build/three.js" and "build/three.min.js" are deprecated with r150+, and will be removed with r160. Please use ES Modules or alternatives: https://threejs.org/docs/index.html#manual/en/introduction/Installation']
  )

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fedb7d',
          borderTopWidth: 0,
        },
      })}>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }}/>
      <Tab.Screen name="Rewards" component={RewardsPage} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
      <Tab.Screen name="Friends" component={FriendsPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
          // options={{title: 'Welcome'}}
          />

        <Stack.Screen
          name="AnimalSelection"
          component={AnimalSelection}
          options={{ headerShown: false }}
          />

        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}