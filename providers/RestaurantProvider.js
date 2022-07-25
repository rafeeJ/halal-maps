import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { countBy, filter, map, startCase, uniq } from 'lodash';

export const ResturantContext = createContext({});

import firestore from '@react-native-firebase/firestore';

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState(null);
    const [location, setLocation] = useState(null)

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
        
        // var data = [];
        // let tempCats = []
        
        // await query.get({source: "cache"})
        //     .then((snap) => {
        //         snap.forEach((doc) => {
        //             let d = doc.data()
        //             data.push(d)
                    
        //             if ("zabData" in d) {
        //                 tempCats.push(...d.zabData.categories)                        
        //             }
        //             if ("uberData" in d) {
        //                 tempCats.push(...d.uberData.categories)
        //             }                
        //         })
        //     });    
            
        // let x = filter(map(countBy(tempCats), function(v, k, c){
        //     if (v > 5) {
        //         return startCase(k)
        //     } else {
        //         return false
        //     }
        // }), (v, k, c) => (v != false))
        
        setRestaurants(finalData);
        setLoading(false);
    }

    const checkRegion = async () => {
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
        <ResturantContext.Provider value={{ loading, restaurants, categories, setRegion, region, location, setLocation }}>
            {children}
        </ResturantContext.Provider>
    );
}; 