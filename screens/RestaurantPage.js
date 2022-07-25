import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Linking, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';

export default function RestaurantPage(props) {
    const route = useRoute()
    const [resta, setRestaurant] = useState(null)

    function openMap() {
        const loc = resta.geometry.location

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${loc.lat},${loc.lng}`;
        const label = resta.name;
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
            <Card>
                <View style={{ padding: 12, alignContent: 'center' }}>
                    <Text h2>{resta?.name}</Text>
                </View>
            </Card>
            <Card>
                <Text h4>Address</Text>
                <Text>{resta?.formatted_address}</Text>
                <View>
                    {
                        resta?.geometry?.location ?
                            <Button title="Get directions!" onPress={openMap} /> :
                            <></>
                    }
                </View>
            </Card>
            <Card>
                <View>
                    <Text>Type:</Text>
                    {resta?.types?.map((item, idx) => {
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