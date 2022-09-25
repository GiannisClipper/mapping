import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = props => {

    const [ currentPage, setCurrentPage ] = useState( { page: null, payload: null, onClose: null } );
    const [ nextPage, setNextPage ] = useState( { page: "HOME", payload: { isWelcome: true } } );
    const [ myMapsAutoRetrieve, setMyMapsAutoRetrieve ] = useState( true );
    const [ usersAutoRetrieve, setUsersAutoRetrieve ] = useState( true );
            
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
