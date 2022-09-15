import { useContext, useEffect, memo } from "react";
import { MapContext } from "./MapContext";
import { GeoRefContext } from "../geometry/GeoRefContext";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';

const Map = memo ( () => {

    const { setMap, map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />

                <NavButton onClick={ e => {
                    if ( ! map.zoom ) {
                        const latLng = geoRef.current.map.ref.getCenter();
                        const zoom = geoRef.current.map.ref.getZoom();
                        setMap( { ...map, ...latLng, zoom } );
                    } else {
                        console.log( geoRef.current.map );
                        geoRef.current.map.ref.setView( [ map.lat, map.lng ], map.zoom, { animate: true, duration: 1.5 } );
                        geoRef.current.map.onClick();
                    }
                } } />

                <ViewButton />

                <TrashButton />
            </Columns>
        </Row>
    );
} );

export { Map };