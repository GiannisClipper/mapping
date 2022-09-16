import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { GeoFocusContextProvider, GeoFocusContext } from "./GeoFocusContext";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { NavMarker, PinMarker, CircleMarker } from "./GeoMarker"
import { SinglePolyline } from "./GeoPolyline";
import { GeoTools } from "./GeoTools";

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
        <GeoFocusContextProvider>
        <div className="GeoMap">
            <MapContainer 
                className="MapContainer"
                center={ [ 25, 0 ] } 
                zoom={ 2 }         
                scrollWheelZoom={false}
            >
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" 
                />
                <GeoMapOnLoad />
                <GeoMapHandler />
            </MapContainer>
            <GeoTools />
        </div>
        </GeoFocusContextProvider>
    )
}

const GeoMapOnLoad = () => {

    const { geoRef } = useContext( GeoRefContext );
    const { setFocus } = useContext( GeoFocusContext );
    const { map } = useContext( MapContext );

    const geoMap = useMap();

    const onClick = useCallback( e => { 
        setFocus( null );
        console.log( geoMap.getCenter(), geoMap.getBounds().getNorthEast(), geoMap.getBounds().getSouthEast() );
    }, [ setFocus, geoMap ] );

    const onClickMap = useMapEvent( 'click', onClick );

    // const onDragend = useCallback( e => console.log( 'map.onDragend()', e.target.getCenter() ), [] );
    // const onDragendMap = useMapEvent( 'dragend', onDragend );

    useEffect( () => { geoRef.current.map = { ref: geoMap, onClick } }, [ geoRef, geoMap, onClick ] );

    useEffect( () => {
        setTimeout( () => {
            const { center, zoom } = map;
            if ( geoRef.current.map && zoom ) {
                geoRef.current.map.ref.setView( center, zoom, { animate: true, duration: 1.5 } );
            }
        }, 500 );
    }, [] );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapOnLoad' ) );
}

const GeoMapHandler = () => {

    const { map } = useContext( MapContext );
    const { focus, setFocus } = useContext( GeoFocusContext );
    
    useEffect( () => console.log( 'Has rendered:', 'GeoMapHandler' ) );

    return (
        <>
        { map.center && map.center.length === 2 // [ lat, lng ]
            ?
            <NavMarker
                position={ map.center }
                draggable={ true }
            >
            </NavMarker>
            :
            null
        }

        { map.lines.map( ( line, index ) =>
            <SinglePolyline
                key={ index }
                index={ index }
                color={ "blue" }
                positions={ line.positions }
                draggable={ true }
                setFocus={ setFocus }
            >
            </SinglePolyline>
        ) }

        { focus && focus.isLine
            ? map.lines[ focus.index ].positions.map( ( position, index ) =>
                <CircleMarker
                    key={ index }
                    index={ index }
                    position={ position }
                    draggable={ true }
                >
                </CircleMarker>
            )
            :
            null
        }

        { map.points.map( ( point, index ) =>
            <PinMarker
                key={ index }
                index={ index }
                position={ point.position }
                draggable={ true }
                setFocus={ setFocus }
            >
            </PinMarker>
        ) }
        </>
    );
}

export { GeoMap };
