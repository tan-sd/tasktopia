import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './screens/LoginPage';
import AnimalSelection from './screens/AnimalSelection';
import HomePage from './screens/HomePage';
import RewardsPage from './screens/RewardsPage';
import ProfilePage from './screens/ProfilePage';
import FriendsPage from './screens/FriendsPage';
import AdminPage from "./screens/AdminPage";
import FriendHomePage from './components/FriendHomePage';
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { auth } from './firebase/firebase';
import { ref, getDatabase, onValue, off } from 'firebase/database';

LogBox.ignoreAllLogs();

LogBox.ignoreLogs(
  ['Scripts "build/three.js" and "build/three.min.js" are deprecated with r150+, and will be removed with r160. Please use ES Modules or alternatives: https://threejs.org/docs/index.html#manual/en/introduction/Installation']
)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function Home() {
  // const [adminStatus, isAdmin] = React.useContext(AuthContext)
  const [status, isAdmin] = React.useState(false)
  React.useEffect(() => {
    const getAdminStatus = async () => {
      const user = auth.currentUser;
      const dbRef = ref(getDatabase(), `users/${user.uid}/isAdmin`);

      const adminRef = onValue(dbRef, (snapshot) => {
        const adminValue = snapshot.val();
        console.log(adminValue)
        isAdmin(adminValue);
      })
      return () => {
        off(adminRef);
      };

    };
    getAdminStatus();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fedb7d',
          borderTopWidth: 0,
        },
      })}>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarLabel: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <MaterialIcons name="pets" size={24} color={focused ? "black" : "grey"} />
        )
      }} />
      <Tab.Screen name="Rewards" component={RewardsPage} options={{
        tabBarLabel: 'Rewards',
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FontAwesome5 name="award" size={24} color={focused ? "black" : "grey"} />
        )
      }}
      />
      <Tab.Screen name="Profile" component={ProfilePage} options={{
        tabBarLabel: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <AntDesign name="profile" size={24} color={focused ? "black" : "grey"} />
        )
      }}
      />
      <Tab.Screen name="Friends" component={FriendsPage} options={{
        tabBarLabel: 'Friends',
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FontAwesome5 name="user-friends" size={24} color={focused ? "black" : "grey"} />
        )
      }}
      />

      {status && < Tab.Screen name="Admin" component={AdminPage} options={{
        tabBarLabel: 'Admin',
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FontAwesome5 name="sliders-h" size={24} color={focused ? "black" : "grey"} />
        )
      }}
      />}
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

          <Stack.Screen
            name="FriendHomePage"
            component={FriendHomePage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}