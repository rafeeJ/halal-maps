import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';
import ProfilePage from '../screens/ProfilePage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function mainStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="List" component={ListView} />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={mainStack} />
      <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown: true}}/>
    </Stack.Navigator>
  );
}