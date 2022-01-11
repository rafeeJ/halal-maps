import React, { useState, createContext, useEffect } from 'react';
import Firebase from "../config/firebase"

export const ResturantContext = createContext({});
const db = Firebase.firestore();
const funcs = Firebase.functions();

import '@expo/browser-polyfill';

export const RestaurantProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRestaurants = async () => {
        setLoading(true);
        var data = [];
        
        // const respHTTP = await fetch("https://us-central1-halal-dining-uk.cloudfunctions.net/createBundle/manchester")
        const respHTTP = await fetch("https://halal-dining-uk.web.app/createBundle/manchester")
        let text = await respHTTP.text()

        const bundlecrap = new global.TextEncoder().encode(text)
        await db.loadBundle(bundlecrap)

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