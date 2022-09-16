import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { MapContext } from "../map/MapContext";
import { GeoRefContext } from "./GeoRefContext";
import { GeoFocusContext } from "./GeoFocusContext";
import { setClassName } from "../_commons/logic/helpers"; 
import navMarker from "./style/compass-discover-line.svg";
import pinMarker from "./style/map-pin-line.svg";
import L from "leaflet";
import { Marker } from "react-leaflet";

const markerIconOptions = {
    className: 'GeoMarkerIcon',
};

const NavMarker = ( { className, position, draggable, ...props } ) => {

    const focusMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: navMarker,
        iconSize: new L.Point( 26, 26 ),
    } );

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const markerRef = useRef();

    const eventHandlers = { 
        click: e => {
            console.log( 'marker.onClick()', e.originalEvent.target );
        },
        dragend: e => {
            const { lat, lng } = e.target.getLatLng();
            const center = [ lat, lng ];
            map.center = center; // direct assignments to avoid redundunt rerender
            map.zoom = geoRef.current.map.ref.getZoom();
        },
    }

    return (
        <Marker 
            className={ setClassName( 'NavMarker', className ) }
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

// Avoiding redundunt rerenders (based on: https://alexsidorenko.com/blog/react-list-rerender/):
// when a component is wrapped in memo() no rerender is triggered while all passing props remain the same 
// any passing arrow functions should be wrapped in useCallback() to be considering the same
// any arrays or objects created on assignment (prop=[...], prop={...} should be replaced with named variables
const PinMarker = memo( ( { index, className, position, draggable, setFocus, ...props } ) => {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );
    
    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const markerRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => setFocus( { isPoint: true, index } ), [ setFocus, index ] );

    const onDragend = e => { 
        const { lat, lng } = e.target.getLatLng();
        map.points[ index ].position = [ lat, lng ]; // direct assignment to avoid redundunt rerender
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
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
        >
            { props.children }
        </Marker>
    );
} );

export { NavMarker, PinMarker };