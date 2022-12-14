import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Point } from "./point";
import { Line } from "./line";
import { Focus } from "./focus";
import { Draw } from "./draw";
import { Guide } from './guide';
import { Center } from './center';

class Map {

    static ref = null;
    static changeable = null;
    static zoomControlRef = null;

    static setup( { id, options, changeable } ) {
        if ( ! Map.ref ) {
            options = { ...( options || {} ), zoomControl: false, scrollWheelZoom: false };
            Map.ref = L.map( id, { center: [ 25, 0 ], zoom: 2, ...options } );
            Map.changeable = changeable;

            Map.zoomControlRef = L.control.zoom( { position: "topleft" } );
            Map.zoomControlRef.addTo( Map.ref );

            L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            } ).addTo( Map.ref );

            // Map.ref.on( 'load', ()={} ); https://stackoverflow.com/questions/31042723/load-event-not-firing-in-leaflet
            // Map.ref.whenReady( () => Map.onLoad( { center, zoom } ) );

            if ( Map.changeable ) {
                Map.ref.on( 'click', Map.onClick );
                Map.ref.on( 'zoomend', Map.onZoomend );
            }
        }
    }

    static onLoad( map ) {
        const { position, zoom } = map;
        if ( Map.ref && position && zoom ) { 
            Map.ref.setView( position, zoom, { animate: true, duration: 2 } );
        }
    }

    static existsZoomControl() {
        return Map.zoomControlRef._map // control insrtance or undefined
            ? true
            : false;
    }

    static enableZoomControl() {
        if ( ! Map.existsZoomControl() ) {
            Map.zoomControlRef.addTo( Map.ref );
        }
    }

    static disableZoomControl() {
        if ( Map.existsZoomControl() ) {
            Map.zoomControlRef.remove();
        }
    }

    static remove() {
        if ( Map.ref ) {
            Map.ref.off();
            Center.instance && Center.instance.remove();
            Line.instances.removeAll();
            Point.instances.removeAll();
            Focus.setInstance( null );
            Guide.removeAll();
            Map.ref.remove();
            Map.ref = null;
        }
    }
    
    static onClick( event ) {
        // console.log( 'Map:onClick()' );
        const { instance } = Focus;
        if ( instance && instance.isLine ) {
            Draw.addGuide( event );
        }
    }

    static onZoomend( event ) {
        const { instance } = Focus;
        if ( instance && instance.isCenter ) {
            instance.onDraw();
        }
    }
}

export { Map };