import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Focus } from "./focus";

class BaseMapItem {

    popup = null;
    static popupOptions = null;
    static parsePopupContent = null;

    constructor( payload ) {
        this.popup = L.popup( { closeButton: false } );
        if ( payload ) {
            this.setPopupContent( payload );
        }
    }

    setPopupContent( payload ) {
        const popupContent = BaseMapItem.parsePopupContent 
            ? BaseMapItem.parsePopupContent( payload ) 
            : payload;

        this.popup.setContent( popupContent );
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