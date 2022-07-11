import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, FlatList, View, Button, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RestaurantPage(props) {
    const route = useRoute()
    const [resta, setRestaurant] = useState(null)

    function openMap() {
        const loc = resta.restaurantData.geometry.location

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${loc.lat},${loc.lng}`;
        const label = resta.restaurantData.name;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    }

    useEffect(() => {
        const { restaurant } = route.params
        setRestaurant(restaurant)
    }, [])

    return (
        <View style={styles.SAView}>
            <Text>Hello {resta?.restaurantData?.name}</Text>
            { resta?.restaurantData?.geometry.location ? 
            <Button title="Get directions!" onPress={openMap}/> :
            <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    SAView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
})