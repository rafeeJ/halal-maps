import React, { useContext, useEffect, useState } from 'react';
import { Button, Text } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

import Firebase from '../../config/firebase';

const auth = Firebase.auth();
const db = Firebase.firestore();

export default function RegionPage(props) {
    const [region, setRegion] = useState("manchester")
    const [regions, setRegions] = useState([])
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        await AsyncStorage.setItem("Region", region)
        props.callback ? props.callback() : props.navigation.goBack()
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
                        console.log(doc.data());
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
            {loading ? <></> :
                <Picker
                    selectedValue={region}
                    onValueChange={(val, idx) => setRegion(val)}
                >
                    {
                        regions.map((val, idx) => {
                            return <Picker.Item label={val.region} value={val.region} />
                        })
                    }
                </Picker>}

            <Button title='Submit' disabled={loading} onPress={() => handleSubmit()} />
        </>
    );
}