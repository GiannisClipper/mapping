import L from "leaflet";
import { Map } from "./map";
import { Focus } from "./focus";

class Line {

    static instances = [];

    static add( { title, positions } ) {
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
        const line = new Line( { title, positions } );
        Line.instances.push( line );
        line.index = Line.instances.length - 1;
        return line;
    }

    static remove( line ) {
        Map.ref.removeLayer( line.ref );
        Line.instances = Line.instances.filter( instance => instance !== line );
        Line.instances.forEach( ( instance, index ) => instance.index = index );
    }

    static onChangePositions = null;

    index = null;
    ref = null;
    popup = null;

    constructor( { title, positions } ) {
        this.popup = L.popup( { closeButton: false } ).setContent( title );
        this.ref = new L.Polyline( positions, 
            { color: 'red', // weight: 3, // opacity: 0.5,
            smoothFactor: 1, 
        } ).bindPopup( this.popup );
        this.ref.on( "click", this.onClick );
        this.ref.on( "mouseover", this.onMouseover );
        this.ref.on( "mouseout", this.onMouseout );
        this.ref.addTo( Map.ref );
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

    onMouseover = event => event.target.openPopup( event.latlng );
    onMouseout = event => event.target.closePopup();
}

export { Line };