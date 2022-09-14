import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { GeoMapContext } from "./GeoMapContext";
import { MapContext } from "../map/MapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import focusMarker from "./style/focus-3-line.svg";
import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import L from "leaflet";
import { Marker } from "react-leaflet";

const markerIconOptions = {
    className: 'GeoMarkerIcon',
};

const FocusMarker = ( { className, position, draggable, ...props } ) => {

    const focusMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: focusMarker,
        iconSize: new L.Point( 26, 26 ),
    } );


    const { map } = useContext( MapContext );
    const markerRef = useRef();

    const eventHandlers = { 
        click: e => {
            console.log( 'marker.onClick()', e.originalEvent.target );
        },
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
        >
            { props.children }
        </Marker>
    );
}

// To avoid useless rerendering ( based on: https://alexsidorenko.com/blog/react-list-rerender/ ):
// wrap the component in memo(), 
// wrap any arrow functions in useCallback(), 
// all props must be the same, no assign arrays or objects created at once
const PinMarker = memo( ( { index, id, className, lat, lng, draggable, setTools, ...props } ) => {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );
    
    const { map } = useContext( MapContext );
    const markerRef = useRef();

    const eventHandlers = { 

        click: useCallback( e => {
            setTools( { title: map.points[ index ].title } );
            // e.originalEvent.stopPropagation();
        }, [ setTools, index, map.points ] ),
        dragend: useCallback( e => {
            // assign values directly, no rerendering required
            const latLng = e.target.getLatLng();
            map.points[ index ].lat = latLng.lat;
            map.points[ index ].lng = latLng.lng;
            // e.originalEvent.stopPropagation();
        }, [ index, map.points ] )
    }

    // assign values directly, no rerendering required
    useEffect( () => { map.points[ index ].ref = markerRef }, [ map, index, markerRef ] );

    useEffect( () => console.log( 'Has rendered:', 'PinMarker' ) );

    return (
        <Marker 
            title={ map.points[ index ].title }
            className={ setClassName( 'PinMarker', className ) }
            icon={ pinMarkerIcon } 
            ref={ markerRef }
            index={ index }
            position={ [ lat, lng ] } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
        >
            { props.children }
        </Marker>
    );
} );

function CircleMarker( { index, className, position, draggable, ...props } ) {

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
        >
            { props.children }
        </Marker>
    );
}

export { FocusMarker, PinMarker, CircleMarker };