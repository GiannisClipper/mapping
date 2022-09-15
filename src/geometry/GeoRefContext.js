import { createContext, useRef, useState, useEffect } from "react";

const GeoRefContext = createContext();

const GeoRefContextProvider = props => {

    const geoRef = useRef( { map: null, lines: [], points: [] } );

    useEffect( () => console.log( 'Has rendered:', 'GeoRefContextProvider' ) );

    return (
        <GeoRefContext.Provider value={ { geoRef } }>
            { props.children }
        </GeoRefContext.Provider>
    )
}

export { GeoRefContext, GeoRefContextProvider };
