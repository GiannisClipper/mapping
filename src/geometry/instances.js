import { Map } from "./map";

class Instances {

    list = [];

    constructor() {};

    add( instance ) {
        this.list.push( instance );
        instance.index = this.list.length - 1;
        return instance;
    }

    getByIndex( index ) {
        const instance = this.list[ index ];
        return instance;
    }

    getLast() {
        const index = this.list.length - 1;
        const instance = this.list[ index ];
        return instance;
    }

    remove( instance ) {
        Map.ref.removeLayer( instance.ref );
        this.list = this.list.filter( _instance => _instance !== instance );
        this.list.forEach( ( _instance, index ) => _instance.index = index );
    }

    removeAll() {
        this.list.forEach( instance => Map.ref.removeLayer( instance.ref ) );
        this.list = [];
    }

    removeByIndex( index ) {
        const instance = this.list[ index ];
        this.remove( instance );
    }
}

export { Instances };