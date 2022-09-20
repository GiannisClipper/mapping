import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function useCenterDraw() {

    const { map, setMap } = useContext( MapContext );

    const onDraw = instance => {
        console.log( 'onDraw', instance );
        if ( instance ) {
            const position = instance.getPosition();
            const zoom = instance.getZoom();
            setMap( { ...map, position, zoom } );
        }
    }

    return { onDraw };
}

export { useCenterDraw };