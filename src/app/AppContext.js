import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ currentPage, _setCurrentPage ] = useState( { endpoint: null, onClose: null } );
    const [ nextPage, setNextPage ] = useState( { endpoint: window.location.pathname } );
    const [ myMapsAutoRetrieve, setMyMapsAutoRetrieve ] = useState( true );
    const [ usersAutoRetrieve, setUsersAutoRetrieve ] = useState( true );
            
    const setCurrentPage = page => {
        // when the new setting is coming from app's buttons or links (not directly from browser's address) 
        if ( page.endpoint !== window.location.pathname &&
            // and is not about an update of onClose method (which is used for the save-on-close feature)
            page.endpoint !== currentPage.endpoint ) {
            window.history.pushState( {}, "", page.endpoint );
        }
        _setCurrentPage( page );
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
