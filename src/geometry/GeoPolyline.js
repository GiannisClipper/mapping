import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { MapContext } from "../map/MapContext";
import { setClassName } from "../_commons/logic/helpers"; 
import { Polyline } from "react-leaflet";

const SinglePolyline = memo( ( { index, className, lat, lng, draggable, setTools, ...props } ) => {

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const polylineRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => {
        setTools( { title: map.lines[ index ].title } );
        e.originalEvent.view.L.DomEvent.stopPropagation( e );
    }, [ setTools, index, map ] );

    const eventHandlers = { click: onClick };

    useEffect( () => { 
        geoRef.current.lines[ index ] = { ref: polylineRef.current, onClick: onClick };
    }, [ geoRef, index, polylineRef, onClick ] );

    
    useEffect( () => console.log( 'Has rendered:', 'SinglePolyline' ) );

    return (
        <Polyline 
            className={ setClassName( 'SinglePolyline', className ) }
            ref={ polylineRef }
            pathOptions={ { color: "lime" } }
            positions={ [ [ lat, lng ], [ lat + 2.05, lng + 2.05 ] ] } 
            eventHandlers={ eventHandlers }
        >
            { props.children }
        </Polyline>
    );
} );

export { SinglePolyline };