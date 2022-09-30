import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function useLineDraw() {

    const { map, setMap } = useContext( MapContext );

    const onDraw = instance => {
        console.log( 'onDraw', instance );
        if ( instance ) {
            const { index } = instance;
            const { lines: oldLines } = map;
            const lines = [ ...oldLines ]; 
            lines[ index ].positions = instance.getPositions();
            lines[ index ].color = instance.getColor();
            lines[ index ].size = instance.getSize();
            setMap( { ...map, lines } );
        }
    }

    return { onDraw };
}

export { useLineDraw };