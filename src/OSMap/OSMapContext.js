import React, { createContext, useRef, useEffect } from 'react';

const OSMapContext = createContext();

const OSMapContextProvider = props => {

    const mapRef = useRef( { map: null, lines: [], points: [] } );

    useEffect( () => console.log( 'Has rendered:', 'OSMapContextProvider' ) );

    return (
        <OSMapContext.Provider value={ mapRef }>
            { props.children }
        </OSMapContext.Provider>
    )
}

export { OSMapContext, OSMapContextProvider };
