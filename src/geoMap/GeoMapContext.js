import { createContext, useRef, useEffect } from "react";

const GeoMapContext = createContext();

const GeoMapContextProvider = props => {

    const globals = useRef( {} );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapContextProvider' ) );

    return (
        <GeoMapContext.Provider value={ globals }>
            { props.children }
        </GeoMapContext.Provider>
    )
}

export { GeoMapContext, GeoMapContextProvider };
