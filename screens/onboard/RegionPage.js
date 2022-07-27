import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

import { ResturantContext } from '../../providers/RestaurantProvider';

import { startCase } from 'lodash'
import { Button, Card, Text } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

export default function RegionPage(props) {
    const { setRegion } = useContext(ResturantContext)

    const [selectedRegion, setSelectedRegion] = useState("manchester")
    const [availableRegions, setAvailableRegions] = useState(null)

    async function handleSubmit() {
        await AsyncStorage.setItem("Region", selectedRegion)
        setRegion(selectedRegion)
        props.navigation.goBack()
    }

    const getRegionsFromFirestore = async () => {
        const regionQuery = await firestore().collection('regions')

        let snapshot = await regionQuery.get({ source: 'cache'})
        if (snapshot.empty) {
            snapshot = await regionQuery.get()
        }

        const regionFromFirestore = []

        snapshot.docs.forEach((doc) => {
            regionFromFirestore.push(doc.id)
        })

        setAvailableRegions(regionFromFirestore)
    }

    useEffect(() => {
        getRegionsFromFirestore()
    }, [])

    return (
        <>
            <Card>
                <Card.Title>Available Regions</Card.Title>
                {
                    availableRegions ?
                        <Picker
                            selectedValue={selectedRegion}
                            onValueChange={(val, idx) => setSelectedRegion(val)}
                        >
                            {
                                availableRegions.map((val, idx) => {
                                    return <Picker.Item key={idx} label={startCase(val)} value={val} />
                                })
                            }
                        </Picker> :
                        <ActivityIndicator />
                        }
            </Card>
            <Card>
                <Button title='Save Region' disabled={!availableRegions} onPress={() => handleSubmit()} />
            </Card>
        </>
    );
}