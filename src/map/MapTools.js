import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Focus } from "../geometry/focus";

function MapTools() {

    const [ draw, setdraw ] = useState( {} );
    const { map } = useContext( MapContext );

    let title = "";

    // console.log( Focus.isLine, Focus.isPoint, Focus.instance )
    if ( Focus.isLine() ) {
        title = map.lines[ Focus.instance.index ].title;
    } else if ( Focus.isPoint() ) {
        title = map.points[ Focus.instance.index ].title;
    }

    const onFocus = () => setdraw( {} );

    useEffect( () => Focus.onFocus = onFocus, [] );
    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        Focus.instance 
        ?
        <div className="MapTools">
            <div>{ title }</div>
            <div>[ tools... ]</div>
        </div>
        :
        null
    );
}

export { MapTools };