import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { GeoContext } from "./GeoContext";
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

// Avoiding useless rerenders (based on: https://alexsidorenko.com/blog/react-list-rerender/):
// when a component is wrapped in memo() no rerendering is triggered while all passing props remain the same 
// any passing arrow functions should be wrapped in useCallback() to be considering the same
// any arrays or objects created on assignment (prop=[...], prop={...} should be replaced 
const PinMarker = memo( ( { index, id, className, lat, lng, draggable, setTools, ...props } ) => {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );
    
    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoContext );
    const markerRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => setTools( { title: map.points[ index ].title } ), [ setTools, index, map ] );

    const onDragend = e => { 
        const latLng = e.target.getLatLng();
        // update specific values only, avoid useless rerender
        map.points[ index ].lat = latLng.lat;
        map.points[ index ].lng = latLng.lng;
    };

    const eventHandlers = { click: onClick, dragend: onDragend };

    useEffect( () => { 
        geoRef.current.points[ index ] = { ref: markerRef.current, onClick: onClick };
    }, [ geoRef, index, markerRef, onClick ] );

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