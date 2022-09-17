import { createContext, useState, useEffect } from "react";

const GeoFocusContext = createContext();

const GeoFocusContextProvider = props => {

    const [ focus, setFocus ] = useState( null );
    const getFocus = () => focus;

    useEffect( () => console.log( 'Has rendered:', 'GeoFocusContextProvider' ) );

    return (
        <GeoFocusContext.Provider value={ { focus, setFocus, getFocus } }>
            { props.children }
        </GeoFocusContext.Provider>
    )
}

export { GeoFocusContext, GeoFocusContextProvider };
