import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Focus } from "../geometry/focus";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";

function MapTools() {

    const [ draw, setDraw ] = useState( {} );
    const { map } = useContext( MapContext );

    let title = "";
    if ( Focus.isLine() ) {
        title = map.lines[ Focus.instance.index ].title;
    } else if ( Focus.isPoint() ) {
        title = map.points[ Focus.instance.index ].title;
    }

    const onFocus = () => setDraw( {} );

    const onChange = e=>setDraw( { color: e.target.value } );

    useEffect( () => Focus.onFocus = onFocus, [] );
    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        Focus.instance 
        ?
        <Rows className="MapTools">
            <Row>{ title }</Row>
            <Row><Text>Color:</Text><ColorInput value={ draw.color } onChange={ onChange }/></Row>
        </Rows>
        :
        null
    );
}

export { MapTools };