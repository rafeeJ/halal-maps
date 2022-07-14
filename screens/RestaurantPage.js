import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Linking, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-elements';

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
        console.log(restaurant);
    }, [])

    return (
        <View style={styles.SAView}>
            <Card>
                <View style={{ padding: 12, alignContent: 'center' }}>
                    <Text h2>{resta?.restaurantData?.name}</Text>
                </View>
                <Card.Divider />
                <Text h4>Address</Text>
                <Text>{resta?.restaurantData?.formatted_address}</Text>
                <View>
                    {
                        resta?.restaurantData?.geometry.location ?
                            <Button title="Get directions!" onPress={openMap} /> :
                            <></>
                    }
                </View>
                <Card.Divider />
                <View>
                    <Text>Type:</Text>
                    {resta?.restaurantData?.types.map((item, idx) => {
                        return (<Text key={idx}>{"-" + " "}{item}</Text>)

                    })}
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    SAView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
})