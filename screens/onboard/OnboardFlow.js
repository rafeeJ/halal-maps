import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from '../auth/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegionPage from './RegionPage';
import LoginScreen from '../auth/LoginScreen';

const Stack = createStackNavigator();

export default function OnboardFlow() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Region" component={RegionPage} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}