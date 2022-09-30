import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function usePointDraw() {

    const { map, setMap } = useContext( MapContext );

    const onDraw = instance => {
        console.log( 'onDraw', instance );
        if ( instance ) {
            const { index } = instance;
            const { points: oldPoints } = map;
            const points = [ ...oldPoints ]; 
            points[ index ].position = instance.getPosition();
            points[ index ].color = instance.getColor();
            points[ index ].size = instance.getSize();
            setMap( { ...map, points } );
        }
    }

    return { onDraw };
}

export { usePointDraw };