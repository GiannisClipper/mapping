import L from "leaflet";
import { Map } from "./map";
import { Instances, BaseMapItem } from "./baseMapItem";
import { SVG } from "./assets";

const createIcon = ( { color, size } ) => {
    size = 2 * size + 20;
    const svg = SVG.MARKER_FILL.replace( "currentColor", color );
    const iconUrl = 'data:image/svg+xml, ' + svg;
    const iconSize = new L.Point( size, size );
    const icon = new L.Icon( { iconUrl, iconSize } );
    return icon;
}

const initialPosition = () => Map.ref.getCenter();
const initialColor = "fuchsia";
const initialSize = 5;

class Point extends BaseMapItem {

    static instances = new Instances();

    static onChangePosition = null;

    isPoint = true;
    ref = null;
    #color = null;
    #size = null;

    constructor( { title, position, color, size } ) {
        super( { title } );

        position = position || initialPosition();
        this.#color = color || initialColor;
        this.#size = size || initialSize;

        this.ref = new L.Marker( position, { 
            icon: createIcon( { 
                color: this.#color, 
                size: this.#size 
            } ), 
            draggable: true,
        } )
        .bindPopup( this.popup );

        this.ref.on( "click", this.onClick );
        this.ref.on( "dragstart", this.onDragstart );
        this.ref.on( "dragend", this.onDragend );
        this.ref.on( "mouseover", this.onMouseover );
        this.ref.on( "mouseout", this.onMouseout );

        this.ref.addTo( Map.ref );
    }

    getPosition() {
        const { lat, lng } = this.ref.getLatLng();
        return [ lat, lng ];
    }

    getColor() {
        return this.#color;
    }

    setColor( color ) {
        this.#color = color;
        this.ref.setIcon( createIcon( { color: this.#color, size: this.#size } ) );
    }

    getSize() {
        return this.#size;
    }

    setSize( size ) {
        this.#size = size;
        this.ref.setIcon( createIcon( { color: this.#color, size: this.#size } ) );
    }

    remove() {
        if ( this.index !== null ) {
            Point.instances.removeByIndex( this.index );
        }
        if ( this.ref !== null ) {
            Map.ref.removeLayer( this.ref );
            this.ref = null;
        }
    }

    onClick = e => {
        // console.log( 'Point:onClick()', this );
        if ( this.hasFocus() ) {
            return;
        }
        this.setFocus();
    }

    onDragstart = event => this.setFocus();
    onDragend = event => Point.onChangePosition( this );
}

export { Point, createIcon };