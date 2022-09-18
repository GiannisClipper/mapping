import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function useLineChange() {

    const { map } = useContext( MapContext );

    const onChangePositions = geoLine => {
        console.log( 'onChangePositions', geoLine );
        if ( geoLine ) {
            const { index } = geoLine;
            map.lines[ index ].positions = geoLine.getPositions();
            // direct assignment, no redundunt rerender
        }
    };
    
    return { onChangePositions };
}

export { useLineChange };