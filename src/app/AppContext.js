import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ samples, setSamples ] = useState( {
        users: [
            { id: "1010", username: "john", password: "pass" },
            { id: "1011", username: "mary", password: "pass" },
            { id: "1012", username: "mike", password: "pass" },
            { id: "1013", username: "roza", password: "pass" },
        ],
        maps: [
            { id: "3401", user_id: "1010", title: "Athens metro network" },
            { id: "3402", user_id: "1011", title: "Trolley 21 route" },
            { id: "3403", user_id: "1010", title: "Running routes in Drapetswna" },
            { id: "3404", user_id: "1012", title: "Athens - Thessaloniki train route" },
            { id: "3405", user_id: "1012", title: "Archaeological tour in central Athens" },
            { id: "3406", user_id: "1011", title: "Trolley 16 route" },
            { id: "3407", user_id: "1011", title: "Trolley 17 route" },
            { id: "3408", user_id: "1010", title: "Tram route in Piraeus" },
            { id: "3409", user_id: "1010", title: "OLP bus routes inside Piraeus port" },
            { id: "3411", user_id: "1012", title: "Thessaloniki metro network" },
            { id: "3411", user_id: "1012", title: "Egnatia highway in North Greece" },
            { id: "3412", user_id: "1010", title: "Ship routes in Cyclades islands" },
        ]
    } );

    const [ username, setUsername ] = useState( null );
    const [ page, setPage ] = useState( "welcome" );
    const [ myMapsLoaded, setMyMapsLoaded ] = useState( false );
        
    const homePage = () => setPage( "home" );
    const searchPage = () => setPage( "search" );
    const myMapsPage = () => setPage( "myMaps" );
    const mapPage = () => setPage( "map" );
    
    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            username, setUsername, 
            page, setPage, homePage, searchPage, myMapsPage, mapPage,
            myMapsLoaded, setMyMapsLoaded, 
            samples, setSamples
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
