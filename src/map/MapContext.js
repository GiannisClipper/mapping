import { createContext, useState, useEffect } from 'react';
import { newMapSchema } from './logic/schema';

const MapContext = createContext();

const MapContextProvider = props => {

    const [ map, setMap ] = useState( newMapSchema() );

    useEffect( () => console.log( 'Has rendered:', 'MapContextProvider' ) );

    return (
        <MapContext.Provider value={ { map, setMap } }>
            { props.children }
        </MapContext.Provider>
    )
}

export { MapContext, MapContextProvider };
