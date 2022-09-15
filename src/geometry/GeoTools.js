import "./style/geoTools.css";
import { useContext, useEffect } from "react";
import { GeoToolsContext } from "./GeoToolsContext";

function GeoTools() {

    const { tools } = useContext( GeoToolsContext );

    useEffect( () => console.log( 'Has rendered:', 'GeoTools' ) );

    return ( 
        tools 
        ?
        <div className="GeoTools">
            {/* <div onClick={ e => e.preventDefault() }>{ tools.title }</div> */}
            <div>{ tools.title }</div>
            <div>[ tools... ]</div>
        </div>
        :
        null
    );
}

export { GeoTools };