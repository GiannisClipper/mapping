import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext } from "react";
import { GeoContext } from "./GeoContext";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { FocusMarker, PinMarker } from "./GeoMarker.js"
import { GeoTools } from "./GeoTools";

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
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
    )
}

function GeoMapOnLoad() {

    const { geoRef } = useContext( GeoContext );
    const { map } = useContext( MapContext );
    const { lat, lng, zoom } = map;

    const geoMap = useMap();

    useEffect( () => { geoRef.current.map = { ref: geoMap } }, [ geoRef, geoMap ] );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapOnLoad' ) );

    useEffect( () => {
        setTimeout( () => { 
            map.ref = geoMap; // assign values directly, no rerender required
            if ( zoom ) { // if map focus has already setup
                map.ref.setView( [ lat, lng ], zoom, { animate: true, duration: 1.5 } );
            }
        }, 500 );
    }, [] );
}

function GeoMapHandler() {

    const { map } = useContext( MapContext );
    const { setTools } = useContext( GeoContext );

    const onClickMap = useMapEvent( 'click', e => {
        console.log( 'map.onClick()', e.originalEvent );
        setTools( null );
    } );

    const onDragendMap = useMapEvent( 'dragend', e => {
        console.log( 'map.onDragend()', e.target.getCenter() );
    } );
    
    useEffect( () => console.log( 'Has rendered:', 'GeoMapHandler' ) );

    return (
        <>
        { map.zoom
            ?
            <FocusMarker
                position={ [ map.lat, map.lng ] }
                draggable={ true }
            >
            </FocusMarker>
            :
            null
        }
        { map.points.map( ( point, index ) =>
            <PinMarker
                key={ index }
                index={ index }
                lat={ point.lat }
                lng={ point.lng }
                draggable={ true }
                setTools={ setTools }
            >
            </PinMarker>
        ) }
        </>
    );
}

export { GeoMap };
