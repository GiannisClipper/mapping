import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";

import L from "leaflet";
import { Marker } from 'react-leaflet'

const markerOptions = {
    // iconUrl: null,
    // iconRetinaUrl: null,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    className: 'customMarkerIcon',
};

const pinMarkerIcon = new L.Icon( {
    ...markerOptions,
    iconUrl: pinMarker,
    iconSize: new L.Point( 26, 26 ),
} );

const circleMarkerIcon = new L.Icon( {
    ...markerOptions,
    iconUrl: circleMarker,
    iconSize: new L.Point( 11, 11 ),
} );

function PinMarker( { position, eventHandlers, draggable, payload, ...props } ) {

    return (
        <Marker 
            className='PinMarker'
            icon={ pinMarkerIcon } 
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

function CircleMarker( { position, eventHandlers, draggable, payload, ...props } ) {

    return (
        <Marker 
            className='CircleMarker'
            icon={ circleMarkerIcon } 
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

export { PinMarker, CircleMarker };