import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Focus } from "./focus";
import { Point } from "./point";

class Map {

    static ref = null;

    static setup( id, center, zoom, options ) {
        if ( ! Map.ref ) {
            center = center || [ 25, 0 ];
            zoom = zoom || 2;
            options = { scrollWheelZoom: false, ...( options || {} ) };

            Map.ref = L.map( id, { center, zoom, ...options } );

            L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            } ).addTo( Map.ref );

            Map.ref.on( 'click', Map.onClick );
        }
    }

    static remove() {
        if ( Map.ref ) {
            Map.ref.off(); 
            Map.ref.remove();
            Map.ref = null;
        }
    }

    static onClick( event ) {
        // console.log( 'Map:onClick()' );
        if ( Focus.isLine() ) {
            Focus.addGuide( event );
            return;  
        }
        Point.add( [ event.latlng.lat, event.latlng.lng ] );
    }
}

export { Map };