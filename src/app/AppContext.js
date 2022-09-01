import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ username, setUsername ] = useState( null );
    const [ page, setPage ] = useState( "welcome" );
    const [ maps, setMaps ] = useState( [] );
    const [ map, setMap ] = useState( {} );

    const signin = () => { setUsername( "john" ); ; setMaps( [] ) };
    const signout = () => { setUsername( null ); setMaps( [] ) };
    const homePage = () => setPage( "home" );
    const searchPage = () => setPage( "search" );
    const myMapsPage = () => setPage( "myMaps" );
    const mapPage = () => setPage( "map" );

    const searchRequest = () => setMaps( [
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

    const mapRequest = () => setMap( {
        title: "Athens metro network",
        lines: [
            { title: "Green line (hsap)" },
            { title: "Blue line" },
            { title: "Red line" },
            { title: "Tram network" },
            { title: "Proastiakos" }
        ],
        points: [
            { title: "Pireas" },
            { title: "N.Faliro" },
            { title: "Moschato" },
            { title: "Kallithea" },
            { title: "Tavros" },
            { title: "Petralwna" },
            { title: "Thissio" },
            { title: "Monastiraki" },
            { title: "Omonoia" }
        ]
    } );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            username, setUsername, 
            page, setPage, signin, signout, homePage, searchPage, myMapsPage, mapPage,
            maps, setMaps, searchRequest,
            map, setMap, mapRequest,
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
