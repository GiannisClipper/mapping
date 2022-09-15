import { createContext, useRef, useState, useEffect } from "react";

const GeoContext = createContext();

const GeoContextProvider = props => {

    const geoRef = useRef( { map: null, lines: [], points: [] } );

    const [ tools, setTools ] = useState( null );

    useEffect( () => console.log( 'Has rendered:', 'GeoContextProvider' ) );

    return (
        <GeoContext.Provider value={ { geoRef, tools, setTools } }>
            { props.children }
        </GeoContext.Provider>
    )
}

export { GeoContext, GeoContextProvider };
