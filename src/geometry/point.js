import L from "leaflet";
import { Map } from "./map";
import { Instances, BaseMapItem } from "./baseMapItem";

//const iconColor = "magenta"; //map.points[ index ].title;
//const getIconUrl = color => `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ color }" d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"/></svg>`;

const createIcon = ( { color, size } ) => {
    size = 2 * size + 20;
    let iconUrl = 'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>';
    iconUrl = iconUrl.replace( "currentColor", color );
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