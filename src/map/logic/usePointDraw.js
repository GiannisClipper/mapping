import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function usePointDraw() {

    const { map } = useContext( MapContext );

    const onDraw = instance => {
        console.log( 'onDraw', instance );
        if ( instance ) {
            const { index } = instance;
            map.points[ index ].position = instance.getPosition();
            map.points[ index ].color = instance.getColor();
            map.points[ index ].size = instance.getSize();
            // direct assignment, no redundunt rerender
        }
    }

    return { onDraw };
}

export { usePointDraw };