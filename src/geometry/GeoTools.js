import "./style/geoTools.css";
import { useContext, useEffect } from "react";
import { GeoFocusContext } from "./GeoFocusContext";

function GeoTools() {

    const { focus } = useContext( GeoFocusContext );

    useEffect( () => console.log( 'Has rendered:', 'GeoTools' ) );

    return ( 
        focus 
        ?
        <div className="GeoTools">
            {/* <div onClick={ e => e.preventDefault() }>{ focus.title }</div> */}
            <div>{ focus.title }</div>
            <div>[ focus... ]</div>
        </div>
        :
        null
    );
}

export { GeoTools };