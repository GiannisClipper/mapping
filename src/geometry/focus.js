import { Guide } from "./guide";

class Focus {

    static instance = null;
    static onFocus = null;

    static setFocus( instance ) {
       Guide.removeAll();
        Focus.instance = instance;
        if ( instance && instance.isLine ) {
            Guide.addMany( instance.getPositions() );                
        }
        this.onFocus && this.onFocus();
        console.log( "Triggered:", "Focus.setFocus", Focus.instance );
    }
}

export { Focus };