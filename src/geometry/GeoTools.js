import "./style/geoTools.css";
import { useContext, useEffect } from "react";
import { GeoFocusContext } from "./GeoFocusContext";
import { MapContext } from "../map/MapContext";

function GeoTools() {

    const { focus } = useContext( GeoFocusContext );
    const { index, isLine, isPoint } = focus || {};
    const { map } = useContext( MapContext );

    const title = 
        isLine ? map.lines[ index ].title : 
        isPoint ? map.points[ index ].title : 
        "";

    useEffect( () => console.log( 'Has rendered:', 'GeoTools' ) );

    return ( 
        focus 
        ?
        <div className="GeoTools">
            {/* <div onClick={ e => e.preventDefault() }>{ focus.title }</div> */}
            <div>{ title }</div>
            <div>[ tools... ]</div>
        </div>
        :
        null
    );
}

export { GeoTools };