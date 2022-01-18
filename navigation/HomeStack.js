import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';
import ProfilePage from '../screens/ProfilePage';
import RestaurantPage from '../screens/RestaurantPage';

import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getHeaderVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "profile";
  if (routeName == "Login" || routeName == "Signup") {
    return false
  }
  return true
}

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

export default function HomeStack() {
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
      <Stack.Screen name="Main" component={mainStack} />
      <Stack.Screen name="Profile" component={profileStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}