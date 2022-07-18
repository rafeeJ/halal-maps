import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

import Firebase from '../../config/firebase';
import { ResturantContext } from '../../providers/RestaurantProvider';

import { startCase } from 'lodash'
import { Button, Card, Text } from 'react-native-elements';

import * as Location from 'expo-location';

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function RegionPage(props) {
    const { setRegion, setLocation } = useContext(ResturantContext)

    const [selectedRegion, setSelectedRegion] = useState("manchester")
    const [regions, setRegions] = useState([])
    const [loading, setLoading] = useState(false)

    const [locationStatus, setLocationStatus] = useState(null)
    const [geoLocation, setGeoLocation] = useState(null)
    const [useLocation, setUseLocation] = useState(true)


    async function handleSubmit() {
        await AsyncStorage.setItem("Region", selectedRegion)
        await AsyncStorage.setItem("Location", selectedRegion)
        setRegion(selectedRegion)
        setLocation(selectedRegion)
        props.navigation.goBack()
    }

    var handleCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setLocationStatus('Please enable location in iOS settings')
            setUseLocation(false)
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        setGeoLocation(location)
        console.log(location)
        setLocationStatus('Permissions are allows, and we have perms')
    }

    const getRegions = async () => {
        setLoading(true)

        try {
            const respHTTP = await fetch("https://halal-dining-uk.web.app/regions")
            let text = await respHTTP.text()

            const bundlecrap = new global.TextEncoder().encode(text)
            await db.loadBundle(bundlecrap)

            var data = [];
            const query = await db.namedQuery("latest-regions-data");
            await query.get({ source: "cache" })
                .then((snap) => {
                    snap.forEach((doc) => {
                        data.push(doc.data())
                    })
                });
            setRegions(data)
            setLoading(false)
        } catch (error) {
            console.debug("Failed to get regions")
            setLoading(false)
        }
    }

    useEffect(() => {
        // Make a request to google cloud functions to get regions! 
        getRegions()
    }, [])

    return (
        <>
            <Card>
                <Card.Title>Available Regions</Card.Title>
                {loading ? <ActivityIndicator /> :
                    <Picker
                        selectedValue={selectedRegion}
                        onValueChange={(val, idx) => setSelectedRegion(val)}
                    >
                        {
                            regions.map((val, idx) => {
                                return <Picker.Item key={idx} label={startCase(val.region)} value={val.region} />
                            })
                        }
                    </Picker>}
            </Card>
            <Card>
                <Button title='Save Region' disabled={loading} onPress={() => handleSubmit()} />
            </Card>
            <Card>
                <Button title='Use current location' disabled={!useLocation} onPress={() => handleCurrentLocation()} />
                { locationStatus ? <Text> {locationStatus} </Text> : <Text>Use the button above to use your current location</Text>}
                
            </Card>
        </>
    );
}