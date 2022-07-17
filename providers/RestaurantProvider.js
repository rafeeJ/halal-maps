import { createContext, useEffect, useState } from 'react';
import Firebase from "../config/firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { countBy, filter, map, startCase, uniq } from 'lodash';

export const ResturantContext = createContext({});
const db = Firebase.firestore();

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
        console.log(region)
        
        // We need to get the region.
        try {
            const r = await AsyncStorage.getItem("Region")
            if (r === null) {
                // there is no region...  
            } else {
                setRegion(r)
                console.log(r);
            }
        } catch (error) {
            console.log(error);
        }
        
        // Once we have it, what can we do. 
        const respHTTP = await fetch(`https://halal-dining-uk.web.app/createBundle/${region}`)
        let text = await respHTTP.text()
        
        const bundlecrap = new global.TextEncoder().encode(text)
        await db.loadBundle(bundlecrap)
        const query = await db.namedQuery(`latest-${region}-restaurant-query`);
        
        var data = [];

        let tempCats = []
        
        await query.get({source: "cache"})
            .then((snap) => {
                snap.forEach((doc) => {
                    let d = doc.data()
                    data.push(d)
                    
                    if ("zabData" in d) {
                        tempCats.push(...d.zabData.categories)                        
                    }
                    if ("uberData" in d) {
                        tempCats.push(...d.uberData.categories)
                    }                
                })
            });    
            
        let x = filter(map(countBy(tempCats), function(v, k, c){
            if (v > 5) {
                return startCase(k)
            } else {
                return false
            }
        }), (v, k, c) => (v != false))
        
        setCategories(uniq(x));
        setRestaurants(data);
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