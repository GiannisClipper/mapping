import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";
import { SizeInput } from "../_commons/SizeInput";
import { createIcon } from "../geometry/point";
import { Focus as GeoFocus } from "../geometry/focus";

function MapTools() {

    const [ draw, setDraw ] = useState( { instance: null } );
    const { map } = useContext( MapContext );

    const onChangeColor = e => {
        const color = e.target.value;
        const { instance } = draw;
        const { index, isLine, isPoint } = instance;

        if ( isLine ) {
            instance.ref.setStyle( { color } );
            map.lines[ index ].color = color; // direct assignment, no redundunt rerender
        } else if ( isPoint ) {
            instance.ref.setIcon( createIcon( { color, size: getValues().size } ) );
            map.points[ index ].color = color; // direct assignment, no redundunt rerender
        }
        setDraw( { ...draw } );
    }

    const onChangeSize = e => {
        const size = e.target.value;
        const { instance } = draw;
        const { index, isLine, isPoint } = instance;

        if ( isLine ) {
            instance.ref.setStyle( { weight: size } );
            map.lines[ index ].size = size; // direct assignment, no redundunt rerender
        } else if ( isPoint ) {
            instance.ref.setIcon( createIcon( { color: getValues().color, size } ) );
            map.points[ index ].size = size; // direct assignment, no redundunt rerender
        }
        setDraw( { ...draw } );
    }

    const onFocus = () => {

        const { instance } = GeoFocus;
        if ( instance !== draw.instance ) {
            setDraw( { instance } );
        }
    }

    const getValues = () => {
        const { index, isLine } = draw.instance;
        const key = isLine ? "lines" : "points";
        return map[ key ][ index ];
    }

    useEffect( () => GeoFocus.onFocus = onFocus );

    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        draw.instance 
        ?
        <Rows className="MapTools">
            <Row>{ getValues().title }</Row>
            <Row>
                <Text>color</Text>
                <ColorInput value={ getValues().color } onChange={ onChangeColor }/>
            </Row>
            <Row>
                <Text>size</Text>
                <SizeInput value={ getValues().size } onChange={ onChangeSize }/>
            </Row>
        </Rows>
        :
        null
    );
}

export { MapTools };