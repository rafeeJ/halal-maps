import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RestaurantProvider } from '../providers/RestaurantProvider';

import RootNavigator from './RootNavigator'

export default function Routes() {
    return (
        <RestaurantProvider>
            <SafeAreaProvider>
                <RootNavigator />
            </SafeAreaProvider>
        </RestaurantProvider>
    );
}