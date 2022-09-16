import { useRef, useEffect, useContext, useState, memo, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { setClassName } from "../_commons/logic/helpers"; 
import { Polyline } from "react-leaflet";

const SinglePolyline = memo( ( { index, className, color, positions, draggable, setFocus, ...props } ) => {

    const [ draw, setDraw ] = useState( { color, positions } );

    const { geoRef } = useContext( GeoRefContext );
    const polylineRef = useRef();

    // wrap in useCallback() to avoid changing the  
    // dependencies of following useEffect() on every render
    const onClick = useCallback( e => {
        setFocus( { isLine: true, index, draw, setDraw } );
        e && e.originalEvent.view.L.DomEvent.stopPropagation( e );
    }, [ setFocus, index, draw, setDraw ] );

    const eventHandlers = { click: onClick };

    useEffect( () => { 
        geoRef.current.lines[ index ] = { ref: polylineRef.current, onClick: onClick };
    }, [ geoRef, index, polylineRef, onClick ] );

    
    useEffect( () => console.log( 'Has rendered:', 'SinglePolyline' ) );

    return (
        <Polyline 
            className={ setClassName( 'SinglePolyline', className ) }
            ref={ polylineRef }
            pathOptions={ { color: draw.color } }
            positions={ [ ...draw.positions ] } 
            eventHandlers={ eventHandlers }
        >
            { props.children }
        </Polyline>
    );
} );

export { SinglePolyline };