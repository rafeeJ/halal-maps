import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { countBy, filter, map, startCase, uniq } from 'lodash';

export const ResturantContext = createContext({});

import firestore from '@react-native-firebase/firestore';

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    const [categories, setCategories] = useState(null)
    
    const [restaurants, setRestaurants] = useState(null);
    const [region, setRegion] = useState(null);

    const getRestaurants = async () => {        
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
        const categories = []

        snapshot.docs.forEach((doc) => {
            let data = doc.data()
            
            finalData.push(data)

            var restaurantCategories;
            try {
                restaurantCategories = data.categories
                categories.push(...restaurantCategories)
            } catch (error) {
                //
            }
        })
        
        let categoryOccurences = countBy(categories);

        let sortedArray = [];
        for (var category in categoryOccurences) {
            sortedArray.push([category, categoryOccurences[category]])
        }

        sortedArray.sort((a,b) => {
            return b[1] - a[1]
        })
        
        setCategories(sortedArray);
        setRestaurants(finalData);
    }

    const checkRegion = async () => {
        console.log("checking storage")
        const regionFromStorage = await AsyncStorage.getItem("Region")
        if (regionFromStorage === null) {
            console.debug("Region has not been set.")
        } else {
            setRegion(regionFromStorage)
            console.debug(`Region has been set to ${ regionFromStorage }`)
        }
    }

    useEffect(() => {
        if (region) {
            getRestaurants()
        }
    }, [region])

    useEffect(() => {checkRegion()}, [])

    return (
        <ResturantContext.Provider value={{ restaurants, categories, setRegion, region }}>
            {children}
        </ResturantContext.Provider>
    );
}; 