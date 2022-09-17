import { Guide } from "./guide";
import { getPositionOrder } from "./helpers";

class Focus {

    static instance = null;
    static isPoint = () => Focus.instance && Focus.instance.constructor.name === "Point";
    static isLine = () => Focus.instance && Focus.instance.constructor.name === "Line";

    static setFocus( instance ) {
        Guide.removeAll();
        Focus.instance = instance;
        if ( Focus.isLine( instance ) ) {
            Guide.addMany( instance.getPositions() );                
        }
    }

    static addGuide( event ) {
        const { lat, lng } = event.latlng;
        const position = [ lat, lng ];
        Guide.add( position );
        Focus.instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        Focus.instance.ref.redraw();  
    }

    static insertGuide( event, instance ) {
        const { lat, lng } = event.latlng;
        const newPosition = [ lat, lng ];
        const positions = instance.getPositions();
        const index = getPositionOrder( newPosition, positions ); 
   
        Guide.insert( index, newPosition );
        Focus.instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        Focus.instance.ref.redraw();
    }

    static moveGuide() {
        Focus.instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        Focus.instance.ref.redraw();
    }

    static removeGuide( guide ) {
        if ( Guide.instances.length > 2 ) {
            Guide.remove( guide );
            Focus.instance.ref.setLatLngs( 
                Guide.instances.map( guide => guide.ref.getLatLng() )
            );
            Focus.instance.ref.redraw();
        }
    }
}

export { Focus };