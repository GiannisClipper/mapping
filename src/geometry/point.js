import L from "leaflet";
import { Map } from "./map";
import { Instances } from "./instances";
import { BaseMapItem } from "./baseMapItem";
import { SVG } from "./assets";

const createIcon = ( { color, size } ) => {
    size = 2 * size + 20;
    const svg = SVG.MARKER_FILL.replace( "currentColor", color );
    const iconUrl = 'data:image/svg+xml, ' + svg;
    const iconSize = new L.Point( size, size );
    const iconAnchor = [ size / 2, size ]; // according to topleft icon pixel
    const popupAnchor = [ 0, -size ]; // according to iconAnchor
    // const shadowUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>`;
    // const shadowSize = [ size * 1.2, size * 1.2 ];
    // const shadowAnchor = [ size * 1.2 / 2, size * 1.2 ]; // according to topleft icon pixel
    // const icon = new L.Icon( { iconUrl, iconSize, iconAnchor, popupAnchor, shadowUrl, shadowSize, shadowAnchor } );
    const icon = new L.Icon( { iconUrl, iconSize, iconAnchor, popupAnchor } );
    return icon;
}

const initialPosition = () => Map.ref.getCenter();
const initialColor = "fuchsia";
const initialSize = 5;

class Point extends BaseMapItem {

    static instances = new Instances();
    static onLoad( points ) {
        Point.instances.removeAll();
        points.forEach( point => {
            const { color, size, position } = point;
            const instance = new Point( { position, color, size } );
            instance.setPopupContent( point );
            Point.instances.add( instance );
        } );
    }
    static onDraw = null;

    isPoint = true;
    index = null;
    ref = null;
    #color = null;
    #size = null;

    constructor( { popupContent, position, color, size } ) {
        super( { popupContent } );

        position = position || initialPosition();
        this.#color = color || initialColor;
        this.#size = size || initialSize;

        this.ref = new L.Marker( position, { 
            icon: createIcon( { 
                color: this.#color, 
                size: this.#size 
            } ), 
            draggable: Map.changeable,
        } )
        .bindPopup( this.popup, { className: "Popup" } );

        if ( Map.changeable ) {
            this.ref.on( "click", this.onClick );
            this.ref.on( "dragstart", this.onDragstart );
            this.ref.on( "dragend", this.onDragend );
        }

        this.ref.on( "mouseover", this.onMouseover );
        this.ref.on( "mouseout", this.onMouseout );

        this.ref.addTo( Map.ref );
    }

    onDraw() { Point.onDraw( this ) };

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

    onClick = event => {
        if ( ! this.hasFocus() ) {
            this.setFocus();
        }
    }

    onDragstart = event => this.setFocus();
    onDragend = event => this.onDraw();
}

export { Point };