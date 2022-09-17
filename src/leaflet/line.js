import L from "leaflet";
import { Map } from "./map";
import { Focus } from "./focus";

class Line {

    static instances = [];

    static add( positions ) {
        if ( ! positions ) {
            const center = Map.ref.getCenter()
            const northEast = Map.ref.getBounds().getNorthEast()
            const southWest = Map.ref.getBounds().getSouthEast()
            const size = ( northEast.lat - southWest.lat ) * 0.25;
            positions = [ 
                [ center.lat - size, center.lng - size ], 
                [ center.lat + size, center.lng + size ] 
            ] ;
        };
        const line = new Line( positions );
        line.ref.addTo( Map.ref );
        Line.instances.push( line );
    }

    static remove( line ) {
        Map.ref.removeLayer( line.ref );
        Line.instances = Line.instances.filter( instance => instance !== line );
    }

    ref = null;

    constructor( positions ) {
        this.ref = new L.Polyline( positions, {
            color: 'red',
            // weight: 3,
            // opacity: 0.5,
            smoothFactor: 1, 
        } );
        this.ref.on( "click", this.onClick );
    }

    getPositions() {
        return this.ref.getLatLngs().map( ll => [ ll.lat, ll.lng ] );
    }

    onClick = event => {
        if ( Focus.instance === this ) {
            Focus.insertGuide( event, this );
            event.originalEvent.view.L.DomEvent.stopPropagation( event );
            return;
        }

        Focus.setFocus( this );
        event.originalEvent.view.L.DomEvent.stopPropagation( event );
        // according to: https://stackoverflow.com/questions/50736530/react-leaflet-stop-propagation-when-click-on-a-drawn-polygon
    }
}

export { Line };