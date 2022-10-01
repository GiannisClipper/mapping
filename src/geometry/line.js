import L from "leaflet";
import { Map } from "./map";
import { Draw } from "./draw";
import { Instances } from "./instances";
import { BaseMapItem } from "./baseMapItem";
import { Focus } from "./focus";
import { Guide } from "./guide";

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
    static onLoad( lines ) {
        Line.instances.removeAll();
        lines.forEach( line => {
            const { color, size, positions } = line;
            const instance = new Line( { positions, color, size } );
            instance.setPopupContent( line );
            Line.instances.add( instance );
        } ) 
    }
    static onDraw = null;

    isLine = true;
    index = null;
    ref = null;
    #color = null;
    #size = null;

    constructor( { popupContent, positions, color, size } ) {
        super( popupContent );

        positions = positions || initialPositions();
        this.#color = color || initialColor;
        this.#size = size || initialSize;

        this.ref = new L.Polyline( positions, { 
            color: this.#color, 
            weight: this.#size, 
            smoothFactor: 1
        } )
        .bindPopup( this.popup, BaseMapItem.popupOptions );

        if ( Map.changeable ) {
            this.ref.on( "click", this.onClick );
        }

        this.ref.on( "mouseover", this.onMouseover );
        this.ref.on( "mouseout", this.onMouseout );

        this.ref.addTo( Map.ref );
    }

    onDraw() { Line.onDraw( this ) };

    getPositions() {
        return this.ref.getLatLngs().map( ll => [ ll.lat, ll.lng ] );
    }

    getColor() {
        return this.#color;
    }

    setColor( color ) {
        this.#color = color;
        this.ref.setStyle( { color } );
    }

    getSize() {
        return this.#size;
    }

    setSize( size ) {
        this.#size = size;
        this.ref.setStyle( { weight: size } );
    }

    remove() {
        if ( this.index !== null ) {
            Line.instances.removeByIndex( this.index );
        }
        if ( this.ref !== null ) {
            Map.ref.removeLayer( this.ref );
            this.ref = null;
        }
    }
    
    onClick = event => {
        event.originalEvent.view.L.DomEvent.stopPropagation( event );
        // according to: https://stackoverflow.com/questions/50736530/react-leaflet-stop-propagation-when-click-on-a-drawn-polygon

        if ( ! this.hasFocus() ) {
            this.setFocus();
        } else {
            Draw.insertGuide( event );
        }
    }

    setFocus = () => {
        if ( ! this.hasFocus() ) {
            Focus.setInstance( this );
            Guide.addMany( this.getPositions() );
        }
    }
    removeFocus = () => {
        if ( this.hasFocus() ) {
            Focus.setInstance( null ); 
            Guide.removeAll();
        }
    }
}

export { Line };