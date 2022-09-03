import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ username, setUsername ] = useState( null );
    const [ page, setPage ] = useState( "welcome" );
        
    const homePage = () => setPage( "home" );
    const searchPage = () => setPage( "search" );
    const myMapsPage = () => setPage( "myMaps" );
    const mapPage = () => setPage( "map" );

    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            username, setUsername, 
            page, setPage, homePage, searchPage, myMapsPage, mapPage,
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
