import { Focus } from "./focus";
import { Guide } from "./guide";
import { getPositionOrder } from "./helpers";

class Draw {

    static addGuide( event ) {
        const { lat, lng } = event.latlng;
        const position = [ lat, lng ];
        Guide.add( position );

        const { instance } = Focus;
        instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        instance.ref.redraw();
        instance.onDraw && instance.onDraw();
    }

    static insertGuide( event ) {
        const { lat, lng } = event.latlng;
        const newPosition = [ lat, lng ];

        const { instance } = Focus;
        const positions = instance.getPositions();
        const index = getPositionOrder( newPosition, positions ); 
        Guide.insert( index, newPosition );
        instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        instance.ref.redraw();
        instance.onDraw && instance.onDraw();
    }

    static moveGuide() {
        const { instance } = Focus;
        instance.ref.setLatLngs( 
            Guide.instances.map( guide => guide.ref.getLatLng() )
        );
        instance.ref.redraw();
        instance.onDraw && instance.onDraw();
    }

    static removeGuide( guide ) {
        if ( Guide.instances.length > 2 ) {
            Guide.remove( guide );
            const { instance } = Focus;
            instance.ref.setLatLngs( 
                Guide.instances.map( guide => guide.ref.getLatLng() )
            );
            instance.ref.redraw();
            instance.onDraw && instance.onDraw();
        }
    }

    static setColor( color ) {
        const { instance } = Focus;
        console.log( instance )
        instance.setColor( color );
        // polylines have 'redraw' method but markers not
        instance.ref.redraw && instance.ref.redraw();
        instance.onDraw && instance.onDraw();
    }

    static setSize( size ) {
        const { instance } = Focus;
        instance.setSize( size );
        // polylines have 'redraw' method but markers not
        instance.ref.redraw && instance.ref.redraw();
        instance.onDraw && instance.onDraw();
    }

    // static setZoom( zoom ) {
    //     const { instance } = Focus;
    //     instance.setZoom( zoom );
    //     // polylines have 'redraw' method but markers not
    //     instance.ref.redraw && instance.ref.redraw();
    //     instance.onDraw && instance.onDraw();
    // }

}

export { Draw };