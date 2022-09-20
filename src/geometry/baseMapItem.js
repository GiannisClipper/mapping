import { Map } from "./map";
import { Focus } from "./focus";
import L from "leaflet";

class Instances {

    #list = [];

    constructor() {};

    add( instance ) {
        this.#list.push( instance );
        instance.index = this.#list.length - 1;
        return instance;
    }

    getByIndex( index ) {
        const instance = this.#list[ index ];
        return instance;
    }

    getLast() {
        const index = this.#list.length - 1;
        const instance = this.#list[ index ];
        return instance;
    }

    getAll() {
        return this.#list;
    }

    removeByIndex( index ) {
        const instance = this.#list[ index ];
        this.#list = this.#list.filter( inst => inst !== instance );
        this.#reindex();
        instance.index = null;
        instance.remove();
    }

    removeAll() {
        this.#list.forEach( instance => Map.ref.removeLayer( instance.ref ) );
        this.#list = [];
    }

    #reindex() {
        this.#list.forEach( ( instance, index ) => instance.index = index );
    }
}

class BaseMapItem {

    index = null;
    popup = null;

    constructor( { title } ) {
        this.popup = L.popup( { closeButton: false } ).setContent( title );
    }

    onMouseover = event => event.target.openPopup( event.latlng );
    onMouseout = event => event.target.closePopup();

    setFocus = () => Focus.setFocus( this );
    hasFocus = () => Focus.instance === this;
    removeFocus = () => { if ( this.hasFocus() ) Focus.setFocus( null ); }
}

export { Instances, BaseMapItem };