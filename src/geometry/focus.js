import { Guide } from "./guide";

class Focus {

    static instance = null;
    static isPoint = () => Focus.instance && Focus.instance.constructor.name === "Point";
    static isLine = () => Focus.instance && Focus.instance.constructor.name === "Line";

    static onFocus = null;

    static setFocus( instance ) {
        Guide.removeAll();
        Focus.instance = instance;
        if ( Focus.isLine( instance ) ) {
            Guide.addMany( instance.getPositions() );                
        }
        this.onFocus && this.onFocus();
    }
}

export { Focus };