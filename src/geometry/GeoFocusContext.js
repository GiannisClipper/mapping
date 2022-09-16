import { createContext, useState, useEffect } from "react";

const GeoFocusContext = createContext();

const GeoFocusContextProvider = props => {

    const [ focus, setFocus ] = useState( null );

    useEffect( () => console.log( 'Has rendered:', 'GeoFocusContextProvider' ) );

    return (
        <GeoFocusContext.Provider value={ { focus, setFocus } }>
            { props.children }
        </GeoFocusContext.Provider>
    )
}

export { GeoFocusContext, GeoFocusContextProvider };
