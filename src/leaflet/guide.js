import L from "leaflet";
import { Map } from "./map";
import { Focus } from "./focus";

const iconUrl = `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>`;
const icon = new L.Icon( { iconUrl, iconSize: new L.Point( 11, 11 ) } );

class Guide {

    static instances = [];

    static add( position ) {
        const guide = new Guide( position );
        Guide.instances.push( guide );
    }

    static addMany( positions ) {
        for ( const position of positions ) {
            Guide.add( position );
        }
    }

    static insert( index, position ) {
        const guide = new Guide( position );
        guide.ref.addTo( Map.ref );
        Guide.instances.splice( index, 0, guide );
    }

    static remove( guide ) {
        Map.ref.removeLayer( guide.ref );
        Guide.instances = Guide.instances.filter( instance => instance !== guide );
    }

    static removeAll() {
        Guide.instances.forEach( guide => Map.ref.removeLayer( guide.ref ) );
        Guide.instances = [];
    }

    ref = null;

    constructor( position ) {
        this.ref = new L.Marker( position, { icon, draggable: true } );
        this.ref.on( "click", this.onClick );
        this.ref.on( "drag", this.onDrag );
        this.ref.addTo( Map.ref );
    }

    onClick = event => Focus.removeGuide( this );
    onDrag = event => Focus.moveGuide();
}

export { Guide };