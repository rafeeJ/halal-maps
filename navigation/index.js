import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './RootNavigator'

export default function Routes() {
    return (
        <SafeAreaProvider>
            <RootNavigator />
        </SafeAreaProvider>
    );
}