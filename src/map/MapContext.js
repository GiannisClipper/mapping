import React, { createContext, useState, useEffect } from 'react';

const MapContext = createContext();

const MapContextProvider = props => {

    const [ map, setMap ] = useState( {} );

    useEffect( () => console.log( 'Has rendered. ', 'MapContextProvider' ) );

    return (
        <MapContext.Provider value={ { map, setMap } }>
            { props.children }
        </MapContext.Provider>
    )
}

export { MapContext, MapContextProvider };
