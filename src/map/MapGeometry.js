import "./style/mapPage.css";

import { useEffect } from "react";
import { Map as GeoMap } from "../geometry/map";
import { BaseMapItem as GeoBaseMapItem } from "../geometry/baseMapItem";

const popupOptions = { maxWidth: 360 };
const parsePopupContent = ( { title, description } ) => {
    description = description || "";
    description = description.replace( "\n", "<br>" ); 
    return description 
        ? `<b>${title}</b><hr>${description}<br>`
        : `<b>${title}</b>`;
}

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