import React, { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

const SearchContextProvider = props => {

    const [ maps, setMaps ] = useState( [] );

    const request = () => setMaps( [
        { title: "Athens metro network" },
        { title: "Trolley 21 route" },
        { title: "Running routes in Drapetswna" },
        { title: "Athens - Thessaloniki train route" },
        { title: "Archaeological tour in central Athens" },
        { title: "Athens metro network" },
        { title: "Trolley 21 route" },
        { title: "Running routes in Drapetswna" },
        { title: "Athens - Thessaloniki train route" },
        { title: "Archaeological tour in central Athens" },
        { title: "Athens metro network" },
        { title: "Trolley 21 route" },
        { title: "Running routes in Drapetswna" },
        { title: "Athens - Thessaloniki train route" },
        { title: "Archaeological tour in central Athens" },
        { title: "Athens metro network" },
        { title: "Trolley 21 route" },
        { title: "Running routes in Drapetswna" },
        { title: "Athens - Thessaloniki train route" },
        { title: "Archaeological tour in central Athens" }
    ] );

    useEffect( () => console.log( 'Has rendered. ', 'SearchContextProvider' ) );

    return (
        <SearchContext.Provider value={ { 
            maps, setMaps, request
        } }>
            { props.children }
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchContextProvider };
