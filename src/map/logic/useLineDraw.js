import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function useLineDraw() {

    const { map, setMap } = useContext( MapContext );

    const onDraw = instance => {
        console.log( 'onDraw', instance );
        if ( instance ) {
            const { index } = instance;
            map.lines[ index ].positions = instance.getPositions();
            map.lines[ index ].color = instance.getColor();
            map.lines[ index ].size = instance.getSize();
            setMap( { ...map } );
        }
    }

    return { onDraw };
}

export { useLineDraw };