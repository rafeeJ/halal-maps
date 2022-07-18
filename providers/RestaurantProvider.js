import { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { countBy, filter, map, startCase, uniq } from 'lodash';

export const ResturantContext = createContext({});

import firestore from '@react-native-firebase/firestore';

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({});
    const [location, setLocation] = useState(null)

    const getRestaurants = async () => {
        setLoading(true);
        console.log(`Getting restaurants from database for region ${region}`)
        
        // We need to get the region.
        try {
            const r = await AsyncStorage.getItem("Region")
            if (r === null) {
                conesole.debug(`There is no region set in AsyncStorage`);
                return;
            } else {
                setRegion(r)
                console.debug(`Region has been set to ${r}`)
            }
        } catch (error) {
            console.debug(`There has been an error with AsyncStorage${error}`);
        }
        
        // // Once we have it, what can we do. 
        // const respHTTP = await fetch(`https://halal-dining-uk.web.app/createBundle/${region}`)
        // let text = await respHTTP.text()
        
        // const bundlecrap = new global.TextEncoder().encode(text)
        // await db.loadBundle(bundlecrap)
        // const query = await db.namedQuery(`latest-${region}-restaurant-query`);

        const restaurantQuery = await firestore().collection(`regions/${region}/restaurants`)

        let snapshot = await restaurantQuery.get({ source: 'cache' })
        if (snapshot.empty) {
            console.debug("Nothing in the cache, lets get from server.")
            snapshot = await restaurantQuery.get()
        }
        console.debug("We used the cached data!")

        
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

    const checkLocation = async () => {
        const locationFromStorage = await AsyncStorage.getItem("Location")
        if (locationFromStorage === null) {
            console.debug("Location has not been set.")
        } else {
            setLocation(locationFromStorage)
            console.debug(`Location has been set to ${ locationFromStorage }`)
            await getRestaurants()
        }
    }

    // useEffect(() => {
    //     checkLocation()
    // }, []);

    useEffect(() => {
        checkLocation();
    }, [location])

    return (
        <ResturantContext.Provider value={{ loading, restaurants, categories, setRegion, region, location, setLocation }}>
            {children}
        </ResturantContext.Provider>
    );
}; 