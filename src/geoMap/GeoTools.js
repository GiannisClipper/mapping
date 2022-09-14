import "./style/geoTools.css";
import { useContext, useEffect } from "react";
import { GeoMapContext } from "./GeoMapContext";

function GeoTools( { title } ) {

    const { tools } = useContext( GeoMapContext );

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