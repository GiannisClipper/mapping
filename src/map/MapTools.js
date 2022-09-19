import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Focus } from "../geometry/focus";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";
import { SizeInput } from "../_commons/SizeInput";
import { Focus as GeoFocus } from "../geometry/focus";
import { createIcon } from "../geometry/point";

function MapTools() {

    const [ draw, setDraw ] = useState( { instance: null, payload: {} } );
    const { map } = useContext( MapContext );

    const onChangeColor = e => {
        const color = e.target.value;
        const { instance } = GeoFocus;
        const { index, isLine, isPoint } = instance;

        if ( isLine ) {
            instance.ref.setStyle( { color } );
            map.lines[ index ].color = color; // direct assignment, no redundunt rerender
        } else if ( isPoint ) {
            instance.ref.setIcon( createIcon( { color, size: draw.payload.size } ) );
            map.points[ index ].color = color; // direct assignment, no redundunt rerender
        }

        let { payload } = draw;
        payload = { ...payload, color };
        setDraw( { ...draw, payload } );
    }

    const onChangeSize = e => {
        const size = e.target.value;
        const { instance } = GeoFocus;
        const { index, isLine, isPoint } = instance;

        if ( isLine ) {
            instance.ref.setStyle( { weight: size } );
            map.lines[ index ].size = size; // direct assignment, no redundunt rerender
        } else if ( isPoint ) {
            instance.ref.setIcon( createIcon( { color: draw.payload.color, size } ) );
            map.points[ index ].size = size; // direct assignment, no redundunt rerender
        }

        let { payload } = draw;
        payload = { ...payload, size };
        setDraw( { ...draw, payload } );
    }

    const onFocus = () => {

        const { instance } = Focus;
        if ( instance === draw.instance ) {
            return;
        }

        if ( ! instance ) {
            setDraw( { instance: null, payload: {} } );
            return;
        }

        const { index, isLine, isPoint } = instance;
        setDraw( 
            isLine
            ? { instance, payload: { ...map.lines[ index ] } } : 
            isPoint 
            ? { instance, payload: { ...map.points[ index ] } } : 
            draw
        );
    }

    useEffect( () => Focus.onFocus = onFocus );

    useEffect( () => console.log( 'Has rendered:', 'MapTools' ) );

    return ( 
        draw.instance 
        ?
        <Rows className="MapTools">
            <Row>{ draw.payload.title }</Row>
            <Row>
                <Text>color</Text>
                <ColorInput value={ draw.payload.color } onChange={ onChangeColor }/>
            </Row>
            <Row>
                <Text>size</Text>
                <SizeInput value={ draw.payload.size } onChange={ onChangeSize }/>
            </Row>
        </Rows>
        :
        null
    );
}

export { MapTools };