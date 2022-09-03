import React, { createContext, useState, useEffect } from 'react';

const MyMapsContext = createContext();

const MyMapsContextProvider = props => {

    const [ maps, setMaps ] = useState( [] );

    const request = () => setMaps( [
        { title: "Athens metro network" },
        { title: "Trolley 21 route" },
        { title: "Running routes in Drapetswna" },
        { title: "Athens - Thessaloniki train route" },
        { title: "Archaeological tour in central Athens" }
    ] );

    useEffect( () => console.log( 'Has rendered. ', 'MyMapsContextProvider' ) );

    return (
        <MyMapsContext.Provider value={ { 
            maps, setMaps, request
        } }>
            { props.children }
        </MyMapsContext.Provider>
    )
}

export { MyMapsContext, MyMapsContextProvider };
