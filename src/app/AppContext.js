import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ username, setUsername ] = useState( null );
    const [ page, setPage ] = useState( "WELCOME" );
    const [ myMapsAutoRetrieve, setMyMapsAutoRetrieve ] = useState( true );
            
    useEffect( () => console.log( 'Has rendered. ', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            username, setUsername, 
            page, setPage,
            myMapsAutoRetrieve, setMyMapsAutoRetrieve,
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
