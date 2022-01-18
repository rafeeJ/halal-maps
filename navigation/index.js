import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RestaurantProvider } from '../providers/RestaurantProvider';
import { AuthenticatedUserProvider } from '../providers/AuthenticatedUserProvider';

import RootNavigator from './RootNavigator'

export default function Routes() {
    return (
        <AuthenticatedUserProvider>
            <RestaurantProvider>
                <SafeAreaProvider>
                    <RootNavigator />
                </SafeAreaProvider>
            </RestaurantProvider>
        </AuthenticatedUserProvider>
    );
}