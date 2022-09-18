import L from "leaflet";
import { Map } from "./map";
import { Instances } from "./instances";
import { Focus } from "./focus";

/*
fuchsia red purple
lime green teal
aqua blue navy
yellow orange brown
white grey black
*/
const iconColor = "magenta"; //map.points[ index ].title;
const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"/></svg>`;
// const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="${ iconColor }" d="M2 3h19.138a.5.5 0 0 1 .435.748L18 10l3.573 6.252a.5.5 0 0 1-.435.748H4v5H2V3z"/></svg>`;
const iconSize = new L.Point( 26, 26 );
const icon = new L.Icon( { iconUrl, iconSize } );

class Point {

    static instances = new Instances();

    static onChangePosition = null;

    popup = null;

    constructor( { title, position } ) {
        position = position || Map.ref.getCenter();
        this.popup = L.popup( { closeButton: false } ).setContent( title );
        this.ref = new L.Marker( position || Map.ref.getCenter(), { 
            icon, 
            draggable: true 
        } ).bindPopup( this.popup );

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

    setFocus = () => Focus.setFocus( this );
    hasFocus = () => Focus.instance === this;
    removeFocus = () => { if ( this.hasFocus() ) Focus.setFocus( null ); }

    onClick = e => {
        // console.log( 'Point:onClick()', this );
        if ( Focus.instance === this ) {
            return;
        }

        this.setFocus();
    }

    onDragstart = event => this.setFocus();
    onDragend = event => Point.onChangePosition( this );
    onMouseover = event => event.target.openPopup( event.latlng );
    onMouseout = event => event.target.closePopup();
}

export { Point };