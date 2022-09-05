import React, { createContext, useState, useEffect } from 'react';

const MyMapsContext = createContext();

const MyMapsContextProvider = props => {

    const [ maps, setMaps ] = useState( [] );

    useEffect( () => console.log( 'Has rendered. ', 'MyMapsContextProvider' ) );

    return (
        <MyMapsContext.Provider value={ { maps, setMaps } }>
            { props.children }
        </MyMapsContext.Provider>
    )
}

export { MyMapsContext, MyMapsContextProvider };
