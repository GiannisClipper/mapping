import "./style/mapPage.css";

import { useEffect } from "react";
import { Map as GeoMap } from "../geometry/map";
import { BaseMapItem as GeoBaseMapItem } from "../geometry/baseMapItem";

const popupOptions = { maxWidth: 240 };
const parsePopupContent = ( { title, description } ) => ( "<b>" + title + "</b><hr>" + description.replace( "\n", '<br>' ) );

function MapGeometry( { changeable } ) {

    useEffect( () => {
        GeoBaseMapItem.popupOptions = popupOptions;
        GeoBaseMapItem.parsePopupContent = parsePopupContent;
        GeoMap.setup( { id: "geometry", changeable } )
    }, [] );
    useEffect( () => () => GeoMap.remove(), [] );

    useEffect( () => console.log( 'Has rendered:', 'MapGeometry' ) );

    return (
        <div id="geometry" style={ { width: '100%', height: '100%' } } />
    );
}

export { MapGeometry };