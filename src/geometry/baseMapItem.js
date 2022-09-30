import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { Focus } from "./focus";

class BaseMapItem {

    popup = null;
    static PopupContent = null;

    constructor( { popupContent } ) {
        this.popup = L.popup( { closeButton: false } ).setContent( popupContent );
    }

    // getPopupContent() {
    //     this.popup.getContent();
    // }

    setPopupContent( payload ) {
        const popupContent = BaseMapItem.PopupContent 
            ? BaseMapItem.PopupContent( payload ) 
            : null;

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