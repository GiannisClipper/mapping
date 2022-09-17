import { useRef, useEffect, useContext, memo, useCallback } from "react";
import { MapContext } from "../map/MapContext";
import { GeoRefContext } from "./GeoRefContext";
import L from "leaflet";
import { Marker } from "react-leaflet";
//import pinMarker from "./style/map-pin-line.svg";
import { setClassName } from "../_commons/logic/helpers";

// Avoiding redundunt rerenders (based on: https://alexsidorenko.com/blog/react-list-rerender/):
// when a component is wrapped in memo() no rerender is triggered while all passing props remain the same 
// any passing arrow functions should be wrapped in useCallback() to be considering the same
// any arrays or objects created on assignment (prop=[...], prop={...} should be replaced with named variables
const GeoPoint = memo( ( { index, className, position, setFocus, ...props } ) => {

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const pointRef = useRef();

    // onClick change the dependencies of following useEffect() on every render, fix it by wrappig in useCallback() 
    const onClick = useCallback( e => { 
        setFocus( { isPoint: true, index } );
        geoRef.current.focus = { ref: pointRef, index };
    }, [ setFocus, index, geoRef ] );

    const onDragend = e => { 
        const { lat, lng } = e.target.getLatLng();
        map.points[ index ].position = [ lat, lng ]; // direct assignment to avoid redundunt rerender
    };

    const eventHandlers = { click: onClick, dragend: onDragend };

    /*
    fuchsia red purple
    lime green teal
    aqua blue navy
    yellow orange brown
    white grey black
    */
    const iconColor = map.points[ index ].title;
    const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;

    // const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>`;

    // const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"/></svg>`;

    // const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"/></svg>`;

    const icon = new L.Icon( { iconUrl, iconSize: new L.Point( 26, 26 ) } );

    useEffect( () => { 
        geoRef.current.points[ index ] = { ref: pointRef.current, onClick: onClick };
    }, [ geoRef, index, pointRef, onClick ] );

    
    useEffect( () => console.log( 'Has rendered:', 'GeoPoint' ) );

    return (
        <Marker 
            title={ map.points[ index ].title }
            className={ setClassName( 'GeoPoint', className ) }
            icon={ icon } 
            ref={ pointRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ true }
        >
            { props.children }
        </Marker>
    );
} );

export { GeoPoint };