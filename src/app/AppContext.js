import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ page, setPage ] = useState( "WELCOME" );
    const [ myMapsAutoRetrieve, setMyMapsAutoRetrieve ] = useState( true );
            
    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            page, setPage,
            myMapsAutoRetrieve, setMyMapsAutoRetrieve,
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
