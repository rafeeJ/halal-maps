import React, { useState, createContext, useEffect } from 'react';
import Firebase from "../config/firebase"

import { countBy, filter, map, startCase, uniq } from 'lodash'
import AsyncStorage from "@react-native-async-storage/async-storage";    

export const ResturantContext = createContext({});
const db = Firebase.firestore();
const funcs = Firebase.functions();

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState({});

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
        const query = await db.namedQuery("latest-manchester-restaurant-query");
        
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

    useEffect(() => {
        getRestaurants()
    }, []);

    return (
        <ResturantContext.Provider value={{ loading, restaurants, categories }}>
            {children}
        </ResturantContext.Provider>
    );
}; 