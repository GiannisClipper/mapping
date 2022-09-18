import L from "leaflet";
import { Map } from "./map";
import { Instances } from "./instances";
import { Focus } from "./focus";
import { Draw } from "./draw";

const initialPositions = () => {
    // coordination degrees: -90..90 for latitude and -180..180 for longitude
    // example results:
    // getCenter(): {lat: 37.11264015821309, lng: 24.080549036932922} 
    // getBounds().getNorthEast(): {lat: 79.48574423856486, lng: 148.18211153693295} 
    // getBounds().getSouthEast(): {lat: -49.192069068643214, lng: 148.18211153693295}
    const center = Map.ref.getCenter()
    const northEast = Map.ref.getBounds().getNorthEast()
    const southWest = Map.ref.getBounds().getSouthEast()
    const size = ( northEast.lat - southWest.lat ) * 0.1;
    const positions = [ 
        [ center.lat - size, center.lng - size ], 
        [ center.lat + size, center.lng + size ] 
    ];

    return positions;
}

class Line {

    static instances = new Instances();

    static onChangePositions = null;

    popup = null;

    constructor( { title, positions } ) {
        this.popup = L.popup( { closeButton: false } ).setContent( title );
        this.ref = new L.Polyline( positions || initialPositions(), { 
            color: 'red', 
            // weight: 3, 
            // opacity: 0.5,
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

    setFocus = () => Focus.setFocus( this );

    onClick = event => {
        if ( Focus.instance === this ) {
            Draw.insertGuide( event, this );
            event.originalEvent.view.L.DomEvent.stopPropagation( event );
            return;
        }

        this.setFocus();
        event.originalEvent.view.L.DomEvent.stopPropagation( event );
        // according to: https://stackoverflow.com/questions/50736530/react-leaflet-stop-propagation-when-click-on-a-drawn-polygon
    }

    onMouseover = event => event.target.openPopup( event.latlng );
    onMouseout = event => event.target.closePopup();
}

export { Line };