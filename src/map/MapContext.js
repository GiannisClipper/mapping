import React, { createContext, useState, useEffect } from 'react';

const MapContext = createContext();

const MapContextProvider = props => {

    const [ map, setMap ] = useState( { lines: [], points: [] } );

    const mapRequest = () => setMap( {
        title: "Athens metro network",
        lines: [
            { title: "Green line (hsap)" },
            { title: "Blue line" },
            { title: "Red line" },
            { title: "Tram network" },
            { title: "Proastiakos" }
        ],
        points: [
            { title: "Pireas" },
            { title: "N.Faliro" },
            { title: "Moschato" },
            { title: "Kallithea" },
            { title: "Tavros" },
            { title: "Petralwna" },
            { title: "Thissio" },
            { title: "Monastiraki" },
            { title: "Omonoia" }
        ]
    } );

    useEffect( () => console.log( 'Has rendered. ', 'MapContextProvider' ) );

    return (
        <MapContext.Provider value={ { 
            map, setMap, mapRequest
        } }>
            { props.children }
        </MapContext.Provider>
    )
}

export { MapContext, MapContextProvider };
