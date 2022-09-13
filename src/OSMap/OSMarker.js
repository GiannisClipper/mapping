import { useRef, useEffect, useContext } from "react";
import { MapContext } from "../map/MapContext";
import { OSMapContext } from "./OSMapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import L, { map } from "leaflet";
import { Marker } from 'react-leaflet'

const markerIconOptions = {
    className: 'OSMarkerIcon',
};

const markerEventHandlers = {
    click: e => {
        // console.log( 'marker.onClick()', e.originalEvent.target );
        // console.log( 'marker.onClick()', e.target.options[ "data-payload" ] );
        console.log( 'marker.onClick()' );
    },
    dragend: e => {
        console.log( 'marker.onDragend()', e.target.getLatLng() );
    } 
};

function OSMarker( { index, icon, className, position, draggable, payload, ...props } ) {

    const { map, setMap } = useContext( MapContext );
    const mapRef = useContext( OSMapContext );
    const markerRef = useRef();

    const eventHandlers = { 
        ...markerEventHandlers,
        dragend: e => {
            const { points } = map;
            const latLng = e.target.getLatLng();
            points[ index ] = { ...points[ index ], ...latLng }; 
            setMap( { ...map, points } );
        }
    }

    useEffect( () => { mapRef.current.points[ index ] = markerRef }, [ index, mapRef, markerRef ] );

    return (
        <Marker 
            ref={ markerRef }
            icon={ icon } 
            className={ setClassName( 'OSMarker', className ) }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

function PinMarker( { index, className, position, eventHandlers, draggable, payload, ...props } ) {

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );
        
    return (
        <OSMarker 
            index={ index }
            icon={ pinMarkerIcon } 
            className={ setClassName( 'PinMarker', className ) }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            data-payload={ payload }
        >
            { props.children }
        </OSMarker>
    );
}

function CircleMarker( { index, className, position, eventHandlers, draggable, payload, ...props } ) {

        const circleMarkerIcon = new L.Icon( {
            ...markerIconOptions,
            iconUrl: circleMarker,
            iconSize: new L.Point( 11, 11 ),
        } );
    
        return (
        <OSMarker 
            index={ index }
            icon={ circleMarkerIcon } 
            className={ setClassName( 'CircleMarker', className ) }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
            data-payload={ payload }
        >
            { props.children }
        </OSMarker>
    );
}

export { PinMarker, CircleMarker };