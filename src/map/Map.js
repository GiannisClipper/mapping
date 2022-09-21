import { useContext, useEffect, memo } from "react";
import { MapContext } from "./MapContext";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, TrashButton } from '../_commons/Button';
import { Map as GeoMap } from "../geometry/map";
import { Center as GeoCenter } from "../geometry/center";
import { useCenterDraw } from "./logic/useCenterDraw";

const Map = memo ( () => {

    const { map } = useContext( MapContext );

    const { onDraw } = useCenterDraw();
    useEffect( () => GeoCenter.onDraw = onDraw, [ onDraw ] );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <NavButton onClick={ event => {
                    const { title, position, zoom } = map;
                    GeoMap.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                    if ( ! GeoCenter.instance ) {
                        GeoCenter.instance = new GeoCenter( { title, position, zoom } );
                    }
                    GeoCenter.instance.setFocus();
                } } />

                <EditButton />

                <TrashButton />
            </Columns>
        </Row>
    );
} );

export { Map };