import { useRef, useEffect, useContext, useState, memo, useCallback } from "react";
import { MapContext } from "../map/MapContext";
import { GeoRefContext } from "./GeoRefContext";
import { GeoFocusContext } from "./GeoFocusContext";
import L from "leaflet";
import { Polyline, Marker } from "react-leaflet";
import circleMarker from "./style/checkbox-blank-circle-line.svg";
import { setClassName } from "../_commons/logic/helpers"; 

const GeoLine = memo( ( { index, className, color, positions, setFocus } ) => {

    const [ draw, _setDraw ] = useState( { color, positions } );
    const setDraw = payload => _setDraw( { ...draw, ...payload } );

    const { geoRef } = useContext( GeoRefContext );
    const lineRef = useRef();

    // wrap in useCallback() to avoid changing the  
    // dependencies of following useEffect() on every render
    const onClick = useCallback( e => {
        setFocus( { isLine: true, index } );
        e && e.originalEvent.view.L.DomEvent.stopPropagation( e );
    }, [ setFocus, index ] );

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

const LineMarker = memo( ( { index, className, position, draggable, setFocus, ...props } ) => {

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const { focus } = useContext( GeoFocusContext );
    const markerRef = useRef();

    const icon = new L.Icon( {
        iconUrl: circleMarker,
        iconSize: new L.Point( 11, 11 ),
    } );

    // wrap in useCallback() to avoid changing the  
    // dependencies of following useEffect() on every render
    // const onClick = useCallback( e => setFocus( { index, isPoint: true } ), [ setFocus, index ] );

    const onDrag = e => {
        const { index: lineIndex } = focus;
        const { lat, lng } = e.target.getLatLng();
        map.lines[ lineIndex ].positions[ index ] = [ lat, lng ]; // direct assignment to avoid redundunt rerender
        const { positions } = map.lines[ lineIndex ];
        geoRef.current.lines[ lineIndex ].setDraw( { positions } );
        // geoRef.current.lineMarkers.setDraw( { positions } );
    };

    // const eventHandlers = { click: onClick, drag: onDrag };
    const eventHandlers = { drag: onDrag };

    useEffect( () => { 
        geoRef.current.lineMarkers.ref[ index ] = markerRef.current;
    }, [ geoRef, index, markerRef ] );

    return (
        <Marker 
            className={ setClassName( 'CircleMarker', className ) }
            icon={ icon } 
            ref={ markerRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ draggable }
        >
            { props.children }
        </Marker>
    );
} );

export { GeoLine, GeoLineMarkers };