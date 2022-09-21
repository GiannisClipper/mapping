import { Map } from "./map";

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

    setAll( list ) {
        this.#list = list;
        this.#reindex();
    }

    removeByIndex( index ) {
        const instance = this.#list[ index ];
        this.#list = this.#list.filter( inst => inst !== instance );
        this.#reindex();
        instance.removeFocus();
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

export { Instances };