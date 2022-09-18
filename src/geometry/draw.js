import { Focus } from "./focus";
import { Guide } from "./guide";
import { Line } from "./line";
import { getPositionOrder } from "./helpers";

class Draw {

    static onChangePositions = () => {
        if ( Focus.isLine && Line.onChangePositions ) {
            Line.onChangePositions( Focus.instance );
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
        Draw.onChangePositions();
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
        Draw.onChangePositions();
    }

    static moveGuide() {
        Focus.instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        Focus.instance.ref.redraw();
        Draw.onChangePositions();
    }

    static removeGuide( guide ) {
        if ( Guide.instances.length > 2 ) {
            Guide.remove( guide );
            Focus.instance.ref.setLatLngs( 
                Guide.instances.map( guide => guide.ref.getLatLng() )
            );
            Focus.instance.ref.redraw();
            Draw.onChangePositions();
        }
    }
}

export { Draw };