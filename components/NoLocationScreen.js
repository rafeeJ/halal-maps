import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NoLocationScreen() {
    const navigation = useNavigation();

    var handleClick = () => {
        navigation.navigate("ProfileStack", { screen: "Region"})
    }

    // useEffect(() => {
    //     navigation.setOptions({title: 'You need to set your location', headerShown: 'true'})
    // }, [])
  
    return (
    <SafeAreaView>
        <Text> You need to set your location!</Text>
        <Button onPress={() => handleClick()}></Button>
    </SafeAreaView>
  )
}
