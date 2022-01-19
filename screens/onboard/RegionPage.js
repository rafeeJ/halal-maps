import React, { useContext, useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

import { AuthenticatedUserContext } from '../../providers/AuthenticatedUserProvider';

import Firebase from '../../config/firebase';
import { ResturantContext } from '../../providers/RestaurantProvider';

const auth = Firebase.auth();

export default function RegionPage(props) {

    const { loading } = useContext(ResturantContext)
    const [region, setRegion] = useState("manchester")

    async function handleSubmit() {
        await AsyncStorage.setItem("Region", region)
        props.callback()
    }

    useEffect(() => {
        // Make a request to google cloud functions to get regions! 
    }, [])

    return (
        <>
            <Picker
                selectedValue={region}
                onValueChange={(val, idx) => setRegion(val)}
            >
                <Picker.Item label={"Manchester"} value={"manchester"} />
            </Picker>
            <Button title='Submit' onPress={() => handleSubmit()} />
        </>
    );
}
