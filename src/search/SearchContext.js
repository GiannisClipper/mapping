import React, { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

const SearchContextProvider = props => {

    const [ maps, setMaps ] = useState( [] );

    useEffect( () => console.log( 'Has rendered. ', 'SearchContextProvider' ) );

    return (
        <SearchContext.Provider value={ { maps, setMaps } }>
            { props.children }
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchContextProvider };
