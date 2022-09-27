import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ currentPage, _setCurrentPage ] = useState( { endpoint: null, onClose: null } );
    const [ nextPage, setNextPage ] = useState( { endpoint: window.location.pathname } );
    const [ myMapsAutoRetrieve, setMyMapsAutoRetrieve ] = useState( true );
    const [ usersAutoRetrieve, setUsersAutoRetrieve ] = useState( true );
            
    const setCurrentPage = nextPage => {
        console.log( window.history )
        if ( nextPage.endpoint !== window.location.pathname ) {
            window.history.pushState( {}, "", nextPage.endpoint );
        }
        _setCurrentPage( nextPage );
    }

    useEffect( () => console.log( 'Has rendered:', 'AppContextProvider' ) );

    return (
        <AppContext.Provider value={ { 
            currentPage, setCurrentPage,
            nextPage, setNextPage,
            myMapsAutoRetrieve, setMyMapsAutoRetrieve,
            usersAutoRetrieve, setUsersAutoRetrieve,
        } }>
            { props.children }
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };
