import "./style/geoMap.css";
import 'leaflet/dist/leaflet.css';

import { useEffect, useContext, useRef, useCallback } from "react";
import { GeoRefContext } from "./GeoRefContext";
import { GeoFocusContextProvider, GeoFocusContext } from "./GeoFocusContext";
import { MapContext } from "../map/MapContext"; 
import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { GeoPoint } from "./GeoPoint"
import { GeoLine, GeoLineMarkers } from "./GeoLine";
import { GeoTools } from "./GeoTools";
import { useGeoLine } from "./logic/useGeoLine";
import L from "leaflet";
import { Marker } from "react-leaflet";
import navMarker from "./style/compass-discover-line.svg";

function GeoMap() {

    useEffect( () => console.log( 'Has rendered:', 'GeoMap' ) );

    return (
        <GeoFocusContextProvider>
        <div className="GeoMap">
            <MapContainer 
                className="MapContainer"
                center={ [ 25, 0 ] } 
                zoom={ 2 }         
                scrollWheelZoom={false}
            >
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" 
                />
                <GeoMapOnLoad />
                <GeoMapHandler />
            </MapContainer>
            <GeoTools />
        </div>
        </GeoFocusContextProvider>
    )
}

const GeoMapOnLoad = () => {

    const { map } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );
    const { focus, setFocus } = useContext( GeoFocusContext );

    const { addLineMarker } = useGeoLine( { map, geoRef, focus, setFocus } );

    const geoMap = useMap();

    const onClick = useCallback( event => { 
        if ( ! focus ) {
            return;
        }
        if ( focus.isLine ) {
            addLineMarker( event );
            return ;
        }
        setFocus( null );
        return;

    }, [ focus, setFocus, addLineMarker ] );

    const onClickMap = useMapEvent( 'click', onClick );

    // const onDragend = useCallback( e => console.log( 'map.onDragend()', e.target.getCenter() ), [] );
    // const onDragendMap = useMapEvent( 'dragend', onDragend );

    useEffect( () => { geoRef.current.map = { ref: geoMap, onClick } }, [ geoRef, geoMap, onClick ] );

    useEffect( () => {
        setTimeout( () => {
            const { center, zoom } = map;
            if ( geoRef.current.map && zoom ) {
                geoRef.current.map.ref.setView( center, zoom, { animate: true, duration: 1.5 } );
            }
        }, 500 );
    }, [] );

    useEffect( () => console.log( 'Has rendered:', 'GeoMapOnLoad' ) );
}

const GeoMapHandler = () => {

    const { map } = useContext( MapContext );
    const { focus, setFocus } = useContext( GeoFocusContext );
    
    useEffect( () => console.log( 'Has rendered:', 'GeoMapHandler' ) );

    return (
        <>
        { map.center && map.center.length === 2 // [ lat, lng ]
            ?
            <NavMarker
                position={ map.center }
                draggable={ true }
            >
            </NavMarker>
            :
            null
        }

        { map.lines.map( ( line, index ) =>
            <GeoLine
                key={ index }
                index={ index }
                color={ "blue" }
                positions={ line.positions }
                setFocus={ setFocus }
            >
            </GeoLine>
        ) }

        { focus && focus.isLine
            ? <GeoLineMarkers positions={ map.lines[ focus.index ].positions }/>
            : null
        }

        { map.points.map( ( point, index ) =>
            <GeoPoint
                key={ index }
                index={ index }
                position={ point.position }
                draggable={ true }
                setFocus={ setFocus }
            >
            </GeoPoint>
        ) }
        </>
    );
}

const NavMarker = ( { position } ) => {

    const icon = new L.Icon( { iconUrl: navMarker, iconSize: new L.Point( 26, 26 ) } );

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
            className="Marker NavMarker"
            icon={ icon } 
            ref={ markerRef }
            position={ position } 
            eventHandlers={ eventHandlers }
            draggable={ true }
        >
        </Marker>
    );
}

export { GeoMap };
