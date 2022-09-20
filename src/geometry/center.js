import L from "leaflet";
import { Map } from "./map";
import { BaseMapItem } from "./baseMapItem";
import { SVG } from "./assets";
import { Focus } from "./focus";

const createIcon = () => {
    const iconUrl = 'data:image/svg+xml, ' + SVG.CENTER_LINE;
    const iconSize = new L.Point( 26, 26 );
    const icon = new L.Icon( { iconUrl, iconSize } );
    return icon;
}

class Center extends BaseMapItem {

    static instance = null;
    static onDraw = null;

    isCenter = true;
    ref = null;
 
    constructor( { title, position } ) {
        super( { title } );

        this.ref = new L.Marker( position, {
            icon: createIcon(),
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

    onDraw() { Center.onDraw( this ) };

    getPosition() {
        const { lat, lng } = this.ref.getLatLng();
        return [ lat, lng ];
    }

    getZoom() {
        const zoom = Map.ref.getZoom();
        return zoom;
    }

    setZoom() {
        const zoom = Map.ref.getZoom();
        return zoom;
    }

    remove() {
        Map.ref.removeLayer( this.ref );
        this.ref = null;
        Center.instance = null;
    }

    onClick = e => {
        if ( ! this.hasFocus() ) {
            this.setFocus();
        }
    }

    removeFocus = () => {
        if ( this.hasFocus() ) {
            Focus.setFocus( null ); 
            this.remove();
        }
    }

    onDragstart = event => this.setFocus();
    onDragend = event => this.onDraw();
}

export { Center };