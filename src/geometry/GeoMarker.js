import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { MapContext } from "../map/MapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import navMarker from "./style/compass-discover-line.svg";
import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import L from "leaflet";
import { Marker } from "react-leaflet";

const markerIconOptions = {
    className: 'GeoMarkerIcon',
};

const NavMarker = ( { className, lat, lng, draggable, ...props } ) => {

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
            // assign values directly, no rerendering required
            const latLng = e.target.getLatLng();
            map.lat = latLng.lat;
            map.lng = latLng.lng;
            map.zoom = geoRef.current.map.ref.getZoom();
        },
    }

    return (
        <Marker 
            className={ setClassName( 'NavMarker', className ) }
            icon={ focusMarkerIcon } 
            ref={ markerRef }
            position={ [ lat, lng ] } 
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
const PinMarker = memo( ( { index, className, lat, lng, draggable, setFocus, ...props } ) => {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );
    
    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const markerRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => setFocus( { title: map.points[ index ].title } ), [ setFocus, index, map ] );

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
            position={ [ lat, lng ] } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
        >
            { props.children }
        </Marker>
    );
} );

const CircleMarker = memo( ( { index, className, lat, lng, draggable, setFocus, ...props } ) => {

    const circleMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: circleMarker,
        iconSize: new L.Point( 11, 11 ),
    } );

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const markerRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => setFocus( { title: map.lines[ index ].title } ), [ setFocus, index, map ] );

    const onDragend = e => { 
        const latLng = e.target.getLatLng();
        // update specific values only, avoid useless rerender
        map.lines[ index ].lat = latLng.lat;
        map.lines[ index ].lng = latLng.lng;
    };

    const eventHandlers = { click: onClick, dragend: onDragend };

    useEffect( () => { 
        geoRef.current.lines[ index ] = { ref: markerRef.current, onClick: onClick };
    }, [ geoRef, index, markerRef, onClick ] );

    return (
        <Marker 
            title={ map.lines[ index ].title }
            className={ setClassName( 'CircleMarker', className ) }
            icon={ circleMarkerIcon } 
            ref={ markerRef }
            position={ [ lat, lng ] } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
        >
            { props.children }
        </Marker>
    );
} );

export { NavMarker, PinMarker, CircleMarker };