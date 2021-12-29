import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapView from '../screens/MapView';
import ListView from '../screens/ListView';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapView} />
      <Tab.Screen name="List" component={ListView} />
    </Tab.Navigator>
  );
}