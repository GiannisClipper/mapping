import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { MapContext } from "../map/MapContext";
import { GeoRefContext } from "./GeoRefContext";
import L from "leaflet";
import { Marker } from "react-leaflet";
import pinMarker from "./style/map-pin-line.svg";
import { setClassName } from "../_commons/logic/helpers";

// Avoiding redundunt rerenders (based on: https://alexsidorenko.com/blog/react-list-rerender/):
// when a component is wrapped in memo() no rerender is triggered while all passing props remain the same 
// any passing arrow functions should be wrapped in useCallback() to be considering the same
// any arrays or objects created on assignment (prop=[...], prop={...} should be replaced with named variables
const GeoPoint = memo( ( { index, className, position, setFocus, ...props } ) => {

    const icon = new L.Icon( { iconUrl: pinMarker, iconSize: new L.Point( 26, 26 ) } );
    
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

    
    useEffect( () => console.log( 'Has rendered:', 'GeoPoint' ) );

    return (
        <Marker 
            title={ map.points[ index ].title }
            className={ setClassName( 'GeoPoint', className ) }
            icon={ icon } 
            ref={ markerRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ true }
        >
            { props.children }
        </Marker>
    );
} );

export { GeoPoint };