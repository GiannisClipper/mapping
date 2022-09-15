import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { GeoContext } from "../geometry/GeoContext";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, FocusButton, ViewButton, TrashButton } from '../_commons/Button';

function Map() {

    const { setMap, map } = useContext( MapContext );
    const { geoRef } = useContext( GeoContext );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />
                <FocusButton onClick={ e => {
                    if ( ! map.zoom ) {
                        const latLng = geoRef.current.map.ref.getCenter();
                        const zoom = geoRef.current.map.ref.getZoom();
                        setMap( { ...map, ...latLng, zoom } );
                    } else {
                        geoRef.current.map.ref.setView( [ map.lat, map.lng ], map.zoom, { animate: true, duration: 1.5 } );
                    }
                } } />
                <ViewButton />
                <TrashButton />
            </Columns>
        </Row>
    );
}

export { Map };