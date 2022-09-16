import { useRef, useEffect, useContext, useState, memo, useCallback } from "react";
import { MapContext } from "../map/MapContext";
import { GeoRefContext } from "./GeoRefContext";
import { GeoFocusContext } from "./GeoFocusContext";
import { useGeoLine } from "./logic/useGeoLine";
import L from "leaflet";
import { Polyline, Marker } from "react-leaflet";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import { setClassName } from "../_commons/logic/helpers"; 

const GeoLine = memo( ( { index, className, color, positions, setFocus } ) => {

    const [ draw, _setDraw ] = useState( { color, positions } );
    const setDraw = useCallback( payload => _setDraw( { ...draw, ...payload } ), [ _setDraw, draw ] );

    const { geoRef } = useContext( GeoRefContext );
    const lineRef = useRef();

    // wrap in useCallback() to avoid changing the  
    // dependencies of following useEffect() on every render
    const onClick = useCallback( e => {

        setFocus( { isLine: true, index } );
        geoRef.current.lineMarkers.setDraw( { positions } );
        e && e.originalEvent.view.L.DomEvent.stopPropagation( e );

    }, [ setFocus, index, geoRef, positions ] );

    const eventHandlers = { click: onClick };

    useEffect( () => { 
        geoRef.current.lines[ index ] = { ref: lineRef.current, onClick, setDraw };
    }, [ geoRef, index, lineRef, onClick, setDraw ] );

    useEffect( () => console.log( 'Has rendered:', 'GeoLine' ) );

    return (
        <Polyline 
            className={ setClassName( 'GeoLine', className ) }
            ref={ lineRef }
            pathOptions={ { color: draw.color } }
            positions={ [ ...draw.positions ] } 
            eventHandlers={ eventHandlers }
        >
        </Polyline>
    );
} );

const GeoLineMarkers = memo( ( { positions } ) => {

    const [ draw, setDraw ] = useState( { positions } );

    const { geoRef } = useContext( GeoRefContext );
    
    useEffect( () => { 
        geoRef.current.lineMarkers.setDraw = setDraw;
    }, [ geoRef, setDraw ] );

    useEffect( () => console.log( 'Has rendered:', 'GeoLineMarkers' ) );

    return (
        <>
        { draw.positions.map( ( position, index ) =>
            <LineMarker
                key={ index }
                index={ index }
                position={ position }
                draggable={ true }
            />
        ) }
        </>
    );
} );

const LineMarker = memo( ( { index, position } ) => {

    const icon = new L.Icon( { iconUrl: circleMarker, iconSize: new L.Point( 11, 11 ) } );

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const { focus, setFocus } = useContext( GeoFocusContext );
    const markerRef = useRef();

    const { removeLineMarker, moveLineMarker } = useGeoLine( { map, geoRef, focus, setFocus, index } );
    const onClick = event => removeLineMarker( event );
    const onDrag = event => moveLineMarker( event );
    const eventHandlers = { click: onClick, drag: onDrag };

    useEffect( () => { 
        geoRef.current.lineMarkers.ref[ index ] = markerRef.current;
    }, [ geoRef, index, markerRef ] );

    return (
        <Marker 
            className="Marker LineMarker"
            icon={ icon } 
            ref={ markerRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ true }
        >
        </Marker>
    );
} );

export { GeoLine, GeoLineMarkers };