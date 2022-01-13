import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';
import ProfilePage from '../screens/ProfilePage';
import RestaurantPage from '../screens/RestaurantPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function mapStack() {
  const ms = createStackNavigator()
  return(
    <ms.Navigator screenOptions={{ headerShown: false }}>
      <ms.Screen name="MapC" component={MapPage} />
      <ms.Screen name="Restaurant" component={RestaurantPage} options={{headerShown: true}}/>
    </ms.Navigator>
  )
}

function listStack() {
  const ls = createStackNavigator()
  return(
    <ls.Navigator screenOptions={{ headerShown: false }}>
      <ls.Screen name="ListC" component={ListView} />
      <ls.Screen name="Restaurant" component={RestaurantPage} options={{headerShown: true}}/>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={mainStack} />
      <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown: true}}/>
    </Stack.Navigator>
  );
}