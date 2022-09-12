import "./style/map.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext } from "react";
import { MapContext } from "./MapContext"; 
import { MapContainer, TileLayer, Popup, useMap, useMapEvent } from 'react-leaflet'
import { PinMarker, CircleMarker } from "./Marker.js"

function Map() {

    return (
        <MapContainer className="MapContainer" center={ [ 25, 0 ] } zoom={ 2 }>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" 
            />
            <MapInitial />
            <MapHandler />
        </MapContainer>
        // <div className="tools">[ Tools ]</div>
    )
}

function MapInitial() {

    const { args } = useContext( MapContext );
    const { position, zoom } = args;

    const map = useMap();

    useEffect( () => {
        setTimeout( () => { 
            console.log( map );
            map.setView( position, zoom, { animate: true, duration: 1.5 } ); //map.flyTo()
        }, 500 );
    }, [] );
}

function MapHandler() {

    const { args: { message } } = useContext( MapContext );

    const onClickMap = useMapEvent( 'click', e => {
        console.log( 'map.onClick()', e.originalEvent );
    } );

    const onDragendMap = useMapEvent( 'dragend', e => {
        console.log( 'map.onDragend()', e.target.getCenter() );
    } );

    const markerEventHandlers = {
        click: e => {
            // console.log( 'marker.onClick()', e.originalEvent.target );
            console.log( 'marker.onClick()', e.target.options[ "data-payload" ] );
        } 
    };

    const coords = [ 37.97, 23.73 ];
    const coords2 = [ 37.975, 23.735 ];

    return (
        <>
        <PinMarker
            position={ coords }
            draggable={ true }
            eventHandlers={ markerEventHandlers }
            payload={ { id: 1234 } }
        >
            <Popup>
                a Circle marker with a message: { message }
            </Popup>
        </PinMarker>

        <CircleMarker
            position={ coords2 }
            draggable={ false }
            eventHandlers={ markerEventHandlers }
            payload={ { id: 1234567 } }
        >
            <Popup>
                a Pin marker with a message: { message}
            </Popup>
        </CircleMarker>
        </>
    );
}
export { Map };
