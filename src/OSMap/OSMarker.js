import { useRef, useEffect, useContext } from "react";
import { MapContext } from "../map/MapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import focusMarker from "./style/focus-3-line.svg";
import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import L from "leaflet";
import { Marker } from 'react-leaflet'

const markerIconOptions = {
    className: 'OSMarkerIcon',
};

const markerEventHandlers = {
    // click: e => {
        // console.log( 'marker.onClick()', e.originalEvent.target );
        // console.log( 'marker.onClick()', e.target.options[ "data-payload" ] );
        // console.log( 'marker.onClick()' );
    // },
    dragend: e => {
        console.log( 'marker.onDragend()', e.target.getLatLng() );
    } 
};

// function OSMarker( { index, icon, className, position, draggable, payload, ...props } ) {

//     const { map } = useContext( MapContext );
//     const markerRef = useRef();

//     const eventHandlers = { 
//         ...markerEventHandlers,
//         dragend: e => {
//             const latLng = e.target.getLatLng();
//             map.points[ index ].lat = latLng.lat;
//             map.points[ index ].lng = latLng.lng;
//             // const { points } = map;
//             // points[ index ] = { ...points[ index ], ...latLng }; 
//             // setMap( { ...map, points } );
//         },
//     }

//     useEffect( () => console.log( 'Has rendered:', 'OSMarker' ) );

//     return (
//         <Marker 
//             ref={ markerRef }
//             icon={ icon } 
//             className={ setClassName( 'OSMarker', className ) }
//             position={ position } 
//             eventHandlers={ eventHandlers }
//             draggable={ draggable }
//             data-payload={ payload }
//         >
//             { props.children }
//         </Marker>
//     );
// }

const FocusMarker = ( { className, position, draggable, payload, ...props } ) => {

    const focusMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: focusMarker,
        iconSize: new L.Point( 26, 26 ),
    } );


    const { map } = useContext( MapContext );
    const markerRef = useRef();

    const eventHandlers = { 
        ...markerEventHandlers,
        dragend: e => {
            // assign values directly, no rerendering required
            const latLng = e.target.getLatLng();
            map.lat = latLng.lat;
            map.lng = latLng.lng;
            map.zoom = map.ref.getZoom();
        },
    }

    return (
        <Marker 
            className={ setClassName( 'FocusMarker', className ) }
            icon={ focusMarkerIcon } 
            ref={ markerRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            // data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

const PinMarker = ( { index, className, position, draggable, payload, ...props } ) => {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );

    const { map } = useContext( MapContext );
    const markerRef = useRef();

    const eventHandlers = { 
        ...markerEventHandlers,
        dragend: e => {
            // assign values directly, no rerendering required
            const latLng = e.target.getLatLng();
            map.points[ index ].lat = latLng.lat;
            map.points[ index ].lng = latLng.lng;
        },
    }

    // assign values directly, no rerendering required
    useEffect( () => { map.points[ index ].ref = markerRef }, [ map, index, markerRef ] );

    return (
        <Marker 
            className={ setClassName( 'PinMarker', className ) }
            icon={ pinMarkerIcon } 
            ref={ markerRef }
            index={ index }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            // data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

function CircleMarker( { index, className, position, draggable, payload, ...props } ) {

        const circleMarkerIcon = new L.Icon( {
            ...markerIconOptions,
            iconUrl: circleMarker,
            iconSize: new L.Point( 11, 11 ),
        } );
    
        return (
        <Marker 
            className={ setClassName( 'CircleMarker', className ) }
            icon={ circleMarkerIcon } 
            index={ index }
            position={ position } 
            // eventHandlers={ eventHandlers }
            draggable={ draggable }
            // data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

export { FocusMarker, PinMarker, CircleMarker };