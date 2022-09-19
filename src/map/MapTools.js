import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Focus } from "../geometry/focus";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";
import { SizeInput } from "../_commons/SizeInput";

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

    const onChangeColor = e=>setDraw( { ...draw, color: e.target.value } );
    const onChangeSize = e=>setDraw( { ...draw, size: e.target.value } );

    useEffect( () => Focus.onFocus = onFocus, [] );
    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        Focus.instance 
        ?
        <Rows className="MapTools">
            <Row>{ title }</Row>
            <Row>
                <Text>color</Text>
                <ColorInput value={ draw.color } onChange={ onChangeColor }/>
            </Row>
            <Row>
                <Text>size</Text>
                <SizeInput value={ draw.size } onChange={ onChangeSize }/>
            </Row>
        </Rows>
        :
        null
    );
}

export { MapTools };