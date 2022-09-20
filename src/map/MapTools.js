import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";
import { SizeInput } from "../_commons/SizeInput";
import { Focus as GeoFocus } from "../geometry/focus";

function MapTools() {

    const [ draw, setDraw ] = useState( { instance: null } );
    const { map } = useContext( MapContext );

    const getKey = () => {
        const { isLine } = draw.instance;
        const key = isLine ? "lines" : "points";
        return key;
    }

    const getItem = () => {
        const { index } = draw.instance;
        const item = map[ getKey() ][ index ];
        return item;
    }

    const onChangeColor = e => {
        const color = e.target.value;
        const { instance } = draw;
        const { index } = instance;
        instance.setColor( color );
        map[ getKey() ][ index ].color = color;
        setDraw( { ...draw } );
    }

    const onChangeSize = e => {
        const size = e.target.value;
        const { instance } = draw;
        const { index } = instance;
        instance.setSize( size );
        map[ getKey() ][ index ].size = size;
        setDraw( { ...draw } );
    }

    const onFocus = () => {

        const { instance } = GeoFocus;
        if ( instance !== draw.instance ) {
            setDraw( { instance } );
        }
    }

    useEffect( () => GeoFocus.onFocus = onFocus );

    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        draw.instance 
        ?
        <Rows className="MapTools">
            <Row>{ getItem().title }</Row>
            <Row>
                <Text>color</Text>
                <ColorInput value={ getItem().color } onChange={ onChangeColor }/>
            </Row>
            <Row>
                <Text>size</Text>
                <SizeInput value={ getItem().size } onChange={ onChangeSize }/>
            </Row>
        </Rows>
        :
        null
    );
}

export { MapTools };