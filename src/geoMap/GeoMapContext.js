import { createContext, useState, useEffect } from "react";

const GeoMapContext = createContext();

const GeoMapContextProvider = props => {

    const [ tools, setTools ] = useState( null );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapContextProvider' ) );

    return (
        <GeoMapContext.Provider value={ { tools, setTools } }>
            { props.children }
        </GeoMapContext.Provider>
    )
}

export { GeoMapContext, GeoMapContextProvider };
