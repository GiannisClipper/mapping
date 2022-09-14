import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext } from "react";
import { GeoMapContext, GeoMapContextProvider } from "./GeoMapContext";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { FocusMarker, PinMarker } from "./GeoMarker.js"
import { GeoTools } from "./GeoTools";

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
        <div className="GeoMap">
            <GeoMapContextProvider>
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
            </GeoMapContextProvider>
        </div>
    )
}

function GeoMapOnLoad() {

    const { map } = useContext( MapContext );
    const { lat, lng, zoom } = map;

    const openStreetMap = useMap();

    useEffect( () => console.log( 'Has rendered:', 'GeoMapOnLoad' ) );

    useEffect( () => {
        setTimeout( () => { 
            map.ref = openStreetMap; // assign values directly, no rerender required
            if ( zoom ) { // if map focus has already setup
                map.ref.setView( [ lat, lng ], zoom, { animate: true, duration: 1.5 } );
            }
        }, 500 );
    }, [] );
}

function GeoMapHandler() {

    const { setTools } = useContext( GeoMapContext );

    const globals = useContext( GeoMapContext );
    const { map } = useContext( MapContext );

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
                id={ index }
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
