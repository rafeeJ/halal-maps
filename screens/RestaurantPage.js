import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Linking, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Card, Text, Button, Chip, ListItem, Rating, Icon } from 'react-native-elements';

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
                <View style={{ padding: 12, alignContent: 'center', textAlign: 'center' }}>
                    <Text style={{ textAlign: 'center' }} h4>{resta?.name}</Text>
                    <Card.Divider />
                    <View>
                        <Rating readonly startingValue={resta?.rating} type={'star'} imageSize={30} />
                        <Text style={{ textAlign: 'center' }}>Rating provided by Google</Text>
                    </View>
                </View>
            </Card>

            <Card>
                <Card.Title>Halal information</Card.Title>
                <ListItem bottomDivider topDivider>
                    <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Serves Alcohol: </Text>
                        <Text>{resta?.servesAlcohol ? <Chip title={'Yes'} buttonStyle={{backgroundColor: 'orange'}}/> : <Chip title={'No!'} buttonStyle={{backgroundColor: 'green'}}/>} </Text>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider topDivider>
                    <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Fully Halal Menu?: </Text>
                        <Text>{resta?.fullHalal ? <Chip title={'Yes!'} buttonStyle={{backgroundColor: 'green'}}/> : <Chip title={'No'} buttonStyle={{backgroundColor: 'orange'}}/>} </Text>
                    </ListItem.Content>
                </ListItem>
            </Card>

            <Card>
                <Card.Title>Contact</Card.Title>
                <ListItem bottomDivider topDivider>
                    <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Phone Number: </Text>
                        <Text>{resta?.formatted_phone_number}</Text>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider topDivider>
                    <ListItem.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Address: </Text>
                        <Text>{resta?.formatted_address}</Text>
                    </ListItem.Content>
                </ListItem>
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

// Object {
//     "address_components": Array [
//       Object {
//         "long_name": "275A",
//         "short_name": "275A",
//         "types": Array [
//           "street_number",
//         ],
//       },
//       Object {
//         "long_name": "Upper Brook Street",
//         "short_name": "Upper Brook St",
//         "types": Array [
//           "route",
//         ],
//       },
//       Object {
//         "long_name": "Manchester",
//         "short_name": "Manchester",
//         "types": Array [
//           "postal_town",
//         ],
//       },
//       Object {
//         "long_name": "Greater Manchester",
//         "short_name": "Greater Manchester",
//         "types": Array [
//           "administrative_area_level_2",
//           "political",
//         ],
//       },
//       Object {
//         "long_name": "England",
//         "short_name": "England",
//         "types": Array [
//           "administrative_area_level_1",
//           "political",
//         ],
//       },
//       Object {
//         "long_name": "United Kingdom",
//         "short_name": "GB",
//         "types": Array [
//           "country",
//           "political",
//         ],
//       },
//       Object {
//         "long_name": "M13 0HR",
//         "short_name": "M13 0HR",
//         "types": Array [
//           "postal_code",
//         ],
//       },
//     ],
//     "business_status": "OPERATIONAL",
//     "categories": Array [
//       "American",
//       "Pakistani",
//     ],
//     "formatted_address": "275A Upper Brook St, Manchester M13 0HR, UK",
//     "formatted_phone_number": "0161 248 4848",
//     "fullHalal": true,
//     "geometry": Object {
//       "location": Object {
//         "hash": "gcw2jkntfs",
//         "lat": 53.46048500000001,
//         "lng": -2.221185,
//       },
//     },
//     "name": "Safire Restaurant & Grill",
//     "opening_hours": Object {
//       "weekday_text": Array [
//         "Monday: 4:00 – 10:30 pm",
//         "Tuesday: 4:00 – 10:30 pm",
//         "Wednesday: 4:00 – 10:30 pm",
//         "Thursday: 4:00 – 10:30 pm",
//         "Friday: 4:00 – 11:00 pm",
//         "Saturday: 4:00 – 11:00 pm",
//         "Sunday: 4:00 – 10:30 pm",
//       ],
//     },
//     "place_id": "ChIJP3hgXYaxe0gROwxY7j-5lv8",
//     "price_level": 2,
//     "rating": 4.3,
//     "servesAlcohol": false,
//     "types": Array [
//       "restaurant",
//       "food",
//       "point_of_interest",
//       "establishment",
//     ],
//     "website": "http://www.safire.restaurant/",
//   }