import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListView from '../screens/ListView';
import MapPage from '../screens/MapPage';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="List" component={ListView} />
    </Tab.Navigator>
  );
}