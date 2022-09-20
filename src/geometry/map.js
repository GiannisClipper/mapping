import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Point } from "./point";
import { Line } from "./line";
import { Focus } from "./focus";
import { Draw } from "./draw";
import { Guide } from './guide';

class Map {

    static ref = null;

    static setup( { id, center, zoom, options } ) {
        if ( ! Map.ref ) {
            options = { scrollWheelZoom: false, ...( options || {} ) };
            Map.ref = L.map( id, { center: [ 25, 0 ], zoom: 2, ...options } );

            L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            } ).addTo( Map.ref );

            // Map.ref.on( 'load', ()={} ); https://stackoverflow.com/questions/31042723/load-event-not-firing-in-leaflet
            Map.ref.whenReady( () => Map.onLoad( { center, zoom } ) );
            Map.ref.on( 'click', Map.onClick );
            Map.ref.on( 'zoomend', Map.onZoomend );
        }
    }

    static remove() {
        if ( Map.ref ) {
            Map.ref.off();
            Point.instances.removeAll();
            Line.instances.removeAll();
            Guide.removeAll();
            Map.ref.remove();
            Map.ref = null;
        }
    }

    static onLoad( { center, zoom } ) {
        setTimeout( () => {
            if ( center && zoom ) {
                Map.ref.setView( center, zoom, { animate: true, duration: 2 } );
            }
        }, 500 );
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