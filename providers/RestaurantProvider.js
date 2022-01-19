import React, { useState, createContext, useEffect } from 'react';
import Firebase from "../config/firebase"

import AsyncStorage from "@react-native-async-storage/async-storage";    

export const ResturantContext = createContext({});
const db = Firebase.firestore();
const funcs = Firebase.functions();

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({})

    const getRestaurants = async () => {
        setLoading(true);
        
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

        }
        // Once we have it, what can we do. 

        const respHTTP = await fetch("https://halal-dining-uk.web.app/createBundle/manchester")
        let text = await respHTTP.text()
        
        const bundlecrap = new global.TextEncoder().encode(text)
        await db.loadBundle(bundlecrap)
        
        var data = [];
        const query = await db.namedQuery("latest-manchester-restaurant-query");
        await query.get({source: "cache"})
            .then((snap) => {
                snap.forEach((doc) => {
                    data.push(doc.data())
                })
            });
        
        setRestaurants(data);
        setLoading(false);
    }

    useEffect(() => {
        getRestaurants()
    }, []);

    return (
        <ResturantContext.Provider value={{ loading, restaurants }}>
            {children}
        </ResturantContext.Provider>
    );
}; 