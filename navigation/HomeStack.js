import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';
import ProfilePage from '../screens/ProfilePage';
import RestaurantPage from '../screens/RestaurantPage';

import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeStack() {

  function profileStack() {
    const ps = createStackNavigator()
    return (
      <ps.Navigator>
        <ps.Screen name="ProfileP" component={ProfilePage} />
        <ps.Screen name="Login" component={LoginScreen} />
        <ps.Screen name="Signup" component={SignupScreen} />
      </ps.Navigator>
    )
  }

  function mapStack() {
    const ms = createStackNavigator()
    return (
      <ms.Navigator screenOptions={{ headerShown: false }}>
        <ms.Screen name="MapC" component={MapPage} />
        <ms.Screen name="Restaurant" component={RestaurantPage} options={{ headerShown: true }} />
      </ms.Navigator>
    )
  }

  function listStack() {
    const ls = createStackNavigator()
    return (
      <ls.Navigator screenOptions={{ headerShown: false }}>
        <ls.Screen name="ListC" component={ListView} />
        <ls.Screen name="Restaurant" component={RestaurantPage} options={{ headerShown: true }} />
      </ls.Navigator>
    )
  }

  function mainStack() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Map" component={mapStack} />
        <Tab.Screen name="List" component={listStack} />
      </Tab.Navigator>
    );
  }

  const Navigator = useNavigation()
  useEffect(() => {

    async function check() {
      var b = await AsyncStorage.getItem("poppedUp")
      if (b == "false") {
        console.log(b);
        Navigator.navigate("Signup")
        await AsyncStorage.setItem("poppedUp", "true")
      }
    }

    check()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        presentation: "modal",
        headerMode: "none",
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      })}>
      <Stack.Group>
        <Stack.Screen name="Main" component={mainStack} />
        <Stack.Screen name="Profile" component={profileStack} options={{ headerShown: false }} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}