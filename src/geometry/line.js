import L from "leaflet";
import { Map } from "./map";
import { Draw } from "./draw";
import { Instances, BaseMapItem } from "./baseMapItem";

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

const initialColor = "fuchsia";
const initialSize = 5;

class Line extends BaseMapItem {

    static instances = new Instances();

    static onChangePositions = null;

    isLine = true;
    ref = null;

    constructor( { title, positions, color, size } ) {
        super( { title } );

        positions = positions || initialPositions();
        color = color || initialColor;
        size = size || initialSize;

        this.ref = new L.Polyline( positions, { 
            color, weight: size, smoothFactor: 1,
        } )
        .bindPopup( this.popup );

        this.ref.on( "click", this.onClick );
        this.ref.on( "mouseover", this.onMouseover );
        this.ref.on( "mouseout", this.onMouseout );

        this.ref.addTo( Map.ref );
    }

    getPositions() {
        return this.ref.getLatLngs().map( ll => [ ll.lat, ll.lng ] );
    }

    remove() {
        if ( this.index === null ) {
            Map.ref.removeLayer( this.ref );
            return;
        }
        Line.instances.removeByIndex( this.index );
    }
    
    onClick = event => {
        if ( this.hasFocus() ) {
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