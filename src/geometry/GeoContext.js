import { createContext, useState, useEffect } from "react";

const GeoContext = createContext();

const GeoContextProvider = props => {

    const [ tools, setTools ] = useState( null );

    useEffect( () => console.log( 'Has rendered:', 'GeoContextProvider' ) );

    return (
        <GeoContext.Provider value={ { tools, setTools } }>
            { props.children }
        </GeoContext.Provider>
    )
}

export { GeoContext, GeoContextProvider };
