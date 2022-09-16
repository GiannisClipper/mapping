import { createContext, useRef, useEffect } from "react";

const GeoRefContext = createContext();

const GeoRefContextProvider = props => {

    const geoRef = useRef( { 
        map: {
            ref: null,
        },
        lines: [], // { ref: null, onClick: null, setDraw: null }
        lineMarkers: {
            ref: [],
            setDraw: null,
        },
        points: [], // { ref: null, onClick: null }
    } );

    useEffect( () => console.log( 'Has rendered:', 'GeoRefContextProvider' ) );

    return (
        <GeoRefContext.Provider value={ { geoRef } }>
            { props.children }
        </GeoRefContext.Provider>
    )
}

export { GeoRefContext, GeoRefContextProvider };
