import "./style/osmap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext } from "react";
import { MapContext } from "../map/MapContext"; 
import { OSMapContext } from "./OSMapContext";
import { MapContainer, TileLayer, Popup, useMap, useMapEvent } from 'react-leaflet'
import { PinMarker, CircleMarker } from "./OSMarker.js"

function OSMap() {

    useEffect( () => console.log( 'Has rendered:', 'OSMap' ) );

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
            <OSMapFocus />
            <OSMapHandler />
        </MapContainer>
        // <div className="tools">[ Tools ]</div>
    )
}

function OSMapFocus() {

    const { map: { lat, lng, zoom } } = useContext( MapContext );
    const mapRef = useContext( OSMapContext );

    const openStreetMap = useMap();

    useEffect( () => console.log( 'Has rendered:', 'OSMapFocus' ) );

    useEffect( () => {
        setTimeout( () => { 
            mapRef.current.map = openStreetMap;
            openStreetMap.setView( [ lat, lng ], zoom, { animate: true, duration: 1.5 } ); 
            //openStreetMap.flyTo()
        }, 500 );
    }, [] );
}

function OSMapHandler() {

    const { map } = useContext( MapContext );

    const onClickMap = useMapEvent( 'click', e => {
        console.log( 'map.onClick()', e.originalEvent );
    } );

    const onDragendMap = useMapEvent( 'dragend', e => {
        console.log( 'map.onDragend()', e.target.getCenter() );
    } );

    useEffect( () => console.log( 'Has rendered:', 'OSMapHandler' ) );

    console.log( map )
    return (
        <>
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
export { OSMap };
