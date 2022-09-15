import { createContext, useRef, useState, useEffect } from "react";

const GeoToolsContext = createContext();

const GeoToolsContextProvider = props => {

    const [ tools, setTools ] = useState( null );

    useEffect( () => console.log( 'Has rendered:', 'GeoToolsContextProvider' ) );

    return (
        <GeoToolsContext.Provider value={ { tools, setTools } }>
            { props.children }
        </GeoToolsContext.Provider>
    )
}

export { GeoToolsContext, GeoToolsContextProvider };
