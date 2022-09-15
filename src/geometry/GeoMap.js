import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { GeoToolsContextProvider, GeoToolsContext } from "./GeoToolsContext";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { NavMarker, PinMarker, CircleMarker } from "./GeoMarker"
import { SinglePolyline } from "./GeoPolyline";
import { GeoTools } from "./GeoTools";

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
        <GeoToolsContextProvider>
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
        </GeoToolsContextProvider>
    )
}

const GeoMapOnLoad = () => {

    const { geoRef } = useContext( GeoRefContext );
    const { setTools } = useContext( GeoToolsContext );
    const { map } = useContext( MapContext );

    const geoMap = useMap();

    const onClick = useCallback( e => setTools( null ), [ setTools ] );
    const onClickMap = useMapEvent( 'click', onClick );

    const onDragend = useCallback( e => console.log( 'map.onDragend()', e.target.getCenter() ), [] );
    const onDragendMap = useMapEvent( 'dragend', onDragend );

    useEffect( () => { geoRef.current.map = { ref: geoMap, onClick } }, [ geoRef, geoMap, onClick ] );

    useEffect( () => {
        setTimeout( () => {
            const { lat, lng, zoom } = map;
            if ( geoRef.current.map && zoom ) {
                geoRef.current.map.ref.setView( [ lat, lng ], zoom, { animate: true, duration: 1.5 } );
            }
        }, 500 );
    }, [] );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapOnLoad' ) );
}

const GeoMapHandler = () => {

    const { map } = useContext( MapContext );
    const { setTools } = useContext( GeoToolsContext );
    
    useEffect( () => console.log( 'Has rendered:', 'GeoMapHandler' ) );

    return (
        <>
        { map.zoom
            ?
            <NavMarker
                lat={ map.lat }
                lng={ map.lng }
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
                lat={ line.lat }
                lng={ line.lng }
                draggable={ true }
                setTools={ setTools }
            >
            </SinglePolyline>
        ) }

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
