import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext } from "react";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, Popup, useMap, useMapEvent } from 'react-leaflet'
import { FocusMarker, PinMarker, CircleMarker } from "./GeoMarker.js"

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
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
        // <div className="tools">[ Tools ]</div>
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

    const { map } = useContext( MapContext );
    // map.lat = map.lat ? map.lat : 25;
    // map.lng = map.lng ? map.lng : 0;
    // map.zoom = map.zoom ? map.zoom : 2;

    const onClickMap = useMapEvent( 'click', e => {
        console.log( 'map.onClick()', e.originalEvent );
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
                <Popup>
                    { map.title }
                </Popup>
            </FocusMarker>
            :
            null
        }
        { map.points.map( ( point, index ) =>
            <PinMarker
                key={ index }
                index={ index }
                position={ [ point.lat, point.lng ] }
                draggable={ true }
                // eventHandlers={ markerEventHandlers }
                // payload={ { index } }
            >
                <Popup>
                    { point.title } <br />
                    lat: { point.lat }, lng: { point.lng }
                </Popup>
            </PinMarker>
        ) }
        </>
    );

    // <CircleMarker
    //     position={ [ lat + 0.01, lng + 0.01 ] }
    //     draggable={ false }
    //     eventHandlers={ markerEventHandlers }
    //     payload={ { id: 1234567 } }
    // >
    //     <Popup>
    //         a Pin marker on map: { title }
    //     </Popup>
    // </CircleMarker>
    // </>
}
export { GeoMap };
