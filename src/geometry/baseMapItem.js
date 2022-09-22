import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Focus } from "./focus";

class BaseMapItem {

    popup = null;

    constructor( { title } ) {
        this.popup = L.popup( { closeButton: false } ).setContent( title );
    }

    getTitle() {
        this.popup.getContent();
    }

    setTitle( title ) {
        this.popup.setContent( title );
    }

    onMouseover = event => event.target.openPopup( event.latlng );
    onMouseout = event => event.target.closePopup();

    hasFocus = () => Focus.instance === this;
    setFocus = () => {
        if ( ! this.hasFocus() ) {
            Focus.setInstance( this );
        }
    }
    removeFocus = () => {
        if ( this.hasFocus() ) {
            Focus.setInstance( null ); 
        }
    }
}

export { BaseMapItem };