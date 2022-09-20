import { useContext, useEffect, memo } from "react";
import { MapContext } from "./MapContext";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';
import { Map as GeoMap } from "../geometry/map";

const Map = memo ( () => {

    const { map } = useContext( MapContext );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />

                <NavButton onClick={ e => {
                    // if ( ! map.zoom ) {
                    //     const { lat, lng } = geoRef.current.map.ref.getCenter();
                    //     const center = [ lat, lng ];
                    //     const zoom = geoRef.current.map.ref.getZoom();
                    //     setMap( { ...map, center, zoom } );
                    // } else {
                    //     console.log( geoRef.current.map );
                    //     geoRef.current.map.ref.setView( map.center, map.zoom, { animate: true, duration: 1.5 } );
                    //     geoRef.current.map.onClick();
                    // }

                    let { position, zoom } = map;
                    position = position || GeoMap.ref.getCenter();
                    zoom = zoom || GeoMap.ref.getZoom();
                    GeoMap.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                    // GeoCenter.setFocus();
                } } />

                <ViewButton />

                <TrashButton />
            </Columns>
        </Row>
    );
} );

export { Map };