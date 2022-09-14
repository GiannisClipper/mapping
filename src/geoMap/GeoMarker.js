import { useRef, useEffect, useContext, useState } from "react";
import { GeoMapContext } from "./GeoMapContext";
import { MapContext } from "../map/MapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import focusMarker from "./style/focus-3-line.svg";
import pinMarker from "./style/map-pin-line.svg";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import L from "leaflet";
import { Marker } from "react-leaflet";
import { GeoTools } from "./GeoTools";

const markerIconOptions = {
    className: 'GeoMarkerIcon',
};

const FocusMarker = ( { className, position, draggable, payload, ...props } ) => {

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
            // data-payload={ payload }
        >
            { props.children }
        </Marker>
    );
}

const PinMarker = ( { index, className, position, draggable, payload, ...props } ) => {

    const globals = useContext( GeoMapContext );
    const [ tools, setTools ] = useState( null );

    const pinMarkerIcon = new L.Icon( {
        ...markerIconOptions,
        iconUrl: pinMarker,
        iconSize: new L.Point( 26, 26 ),
    } );

    const { map } = useContext( MapContext );
    const markerRef = useRef();

    const eventHandlers = { 
        click: e => {
            console.log( e.originalEvent.target );
            if ( globals.current.unsetTools ) {
                globals.current.unsetTools();
            }
            setTools( { title: map.points[ index ].title } );
            globals.current.unsetTools = () => setTools( null );
        },
        dragend: e => {
            // assign values directly, no rerendering required
            const latLng = e.target.getLatLng();
            map.points[ index ].lat = latLng.lat;
            map.points[ index ].lng = latLng.lng;
        },
    }

    // assign values directly, no rerendering required
    useEffect( () => { map.points[ index ].ref = markerRef }, [ map, index, markerRef ] );

    useEffect( () => console.log( 'Has rendered:', 'PinMarker' ) );

    return (
        <>
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

        { tools 
        ? <GeoTools title={ tools.title } />
        : null 
        }
        </>
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