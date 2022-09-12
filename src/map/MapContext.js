import React, { createContext, useState, useEffect } from 'react';

const MapContext = createContext();

const MapContextProvider = props => {

    const [ map, setMap ] = useState( {} );
    const [ args, setArgs ] = useState( { 
        position: [ 37.97, 23.73 ],
        zoom: 13,
        message: null
    }
    );

    useEffect( () => console.log( 'Has rendered. ', 'MapContextProvider' ) );

    return (
        <MapContext.Provider value={ { map, setMap, args, setArgs } }>
            { props.children }
        </MapContext.Provider>
    )
}

export { MapContext, MapContextProvider };
