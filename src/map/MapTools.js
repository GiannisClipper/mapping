import "./style/mapTools.css";
import { useContext, useState, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Rows, Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { ColorInput } from "../_commons/ColorInput";
import { SizeInput } from "../_commons/SizeInput";
import { COLORS, SIZES } from "../geometry/assets";
import { Focus as GeoFocus } from "../geometry/focus";
import { Draw as GeoDraw } from "../geometry/draw";

const ColorTool = ( { value, onChange } ) => (
    <Row>
        <Text>Color:</Text>
        <ColorInput values={ COLORS } value={ value } onChange={ onChange } />
    </Row>
);

const SizeTool = ( { value, onChange } ) => (
    <Row>
        <Text>Size:</Text>
        <SizeInput values={ SIZES } value={ value } onChange={ onChange } />
    </Row>
);

function PointTools( { draw, onChangeColor, onChangeSize } ) {

    const { map } = useContext( MapContext );

    const { index } = draw.instance;
    const point = map.points[ index ];
    const { title, color, size } = point;

    return ( 
        <Rows className="MapTools">
            <Row>{ title }</Row>
            <ColorTool value={ color } onChange={ onChangeColor } />
            <SizeTool value={ size } onChange={ onChangeSize } />
        </Rows>
    );
}

function LineTools( { draw, onChangeColor, onChangeSize } ) {

    const { map } = useContext( MapContext );

    const { index } = draw.instance;
    const point = map.lines[ index ];
    const { title, color, size } = point;

    return ( 
        <Rows className="MapTools">
            <Row>{ title }</Row>
            <ColorTool value={ color } onChange={ onChangeColor } />
            <SizeTool value={ size } onChange={ onChangeSize } />
        </Rows>
    );
}

function CenterTools( { draw } ) {

    let { map: { title, position: [ lat, lng ], zoom } } = useContext( MapContext );
    lat = Math.round( lat * 10000 ) / 10000;
    lng = Math.round( lng * 10000 ) / 10000;

    return ( 
        <Rows className="MapTools">
            <Row>{ title }</Row>
            <Row>Lat: { lat }</Row>
            <Row>Lng: { lng }</Row>
            <Row>Zoom: { zoom }</Row>
        </Rows>
    );
}

function MapTools() {

    const [ draw, setDraw ] = useState( { instance: null } );

    const onChangeColor = e => {
        const color = e.target.value;
        GeoDraw.setColor( color );
        setDraw( { ...draw } );
    }

    const onChangeSize = e => {
        const size = e.target.value;
        GeoDraw.setSize( size );
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

    const { instance } = draw;
    const { isCenter, isPoint, isLine } = instance || {};

    return ( 
        isCenter ? 
            <CenterTools
                draw={ draw } 
            />
        : isLine ? 
            <LineTools
                draw={ draw } 
                onChangeColor={ onChangeColor }
                onChangeSize={ onChangeSize }
            />
        : isPoint ? 
            <PointTools 
                draw={ draw } 
                onChangeColor={ onChangeColor }
                onChangeSize={ onChangeSize }
            />
        : null
    );
}

export { MapTools };