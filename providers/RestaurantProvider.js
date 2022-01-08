import React, { useState, createContext } from 'react';

export const ResturantContext = createContext({});

export const RestaurantProvider = ({ children }) => {
    const DATA = [
        {
            id: 'IDFK',
            name: 'Gourment Borgar Kitchen',
            coordinate: {
                latitude: 1,
                longitide: 2
            }
        },
        {
            id: 'IDFK1',
            name: 'Gourment Borgar Kitchen',
            coordinate: {
                latitude: 1,
                longitide: 2
            }
        },
        {
            id: 'IDFK2',
            name: 'Gourment Borgar Kitchen',
            coordinate: {
                latitude: 1,
                longitide: 2
            }
        },
        {
            id: 'IDFK3',
            name: 'Gourment Borgar Kitchen',
            coordinate: {
                latitude: 1,
                longitude: 2
            }
        },
    ]

    const [restaurants, setRestaurants] = useState(DATA);

    return (
        <ResturantContext.Provider value={{ restaurants, setRestaurants }}>
            {children}
        </ResturantContext.Provider>
    );
}; 