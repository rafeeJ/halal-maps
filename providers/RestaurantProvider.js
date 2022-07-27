import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { countBy, filter, map, startCase, uniq } from 'lodash';

export const ResturantContext = createContext({});

import firestore from '@react-native-firebase/firestore';

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    const [categories, setCategories] = useState(null)
    
    const [restaurants, setRestaurants] = useState(null);
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState(null);

    const getRestaurants = async () => {
        setLoading(true);
        
        console.log(`Getting restaurants from database for region ${region}`)
            
        const restaurantQuery = await firestore().collection(`regions/${region}/restaurants`)

        let snapshot = await restaurantQuery.get({ source: 'cache' })
        if (snapshot.empty) {
            console.debug("Nothing in the cache, lets get from server.")
            snapshot = await restaurantQuery.get()
        } else {
            console.debug("We used the cached data!")
        }
        
        const finalData = []
        
        snapshot.docs.forEach((doc) => {
            finalData.push(doc.data())
        })
        
        setRestaurants(finalData);
        setLoading(false);
    }

    const checkRegion = async () => {
        console.log("checking storage")
        const regionFromStorage = await AsyncStorage.getItem("Region")
        if (regionFromStorage === null) {
            console.debug("Region has not been set.")
        } else {
            setRegion(regionFromStorage)
            console.debug(`Location has been set to ${ regionFromStorage }`)
            await getRestaurants()
        }
        setLoading(false)
    }

    useEffect(() => {
        checkRegion();
    }, [region])

    return (
        <ResturantContext.Provider value={{ loading, restaurants, categories, setRegion, region }}>
            {children}
        </ResturantContext.Provider>
    );
}; 