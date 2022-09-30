import "./style/mapPage.css";

import { useEffect } from "react";
import { Map as GeoMap } from "../geometry/map";

function MapGeometry( { changeable } ) {

    useEffect( () => GeoMap.setup( { id: "geometry", changeable } ), [] );
    useEffect( () => () => GeoMap.remove(), [] );

    useEffect( () => console.log( 'Has rendered:', 'MapGeometry' ) );

    return (
        <div id="geometry" style={ { width: '100%', height: '100%' } } />
    );
}

export { MapGeometry };