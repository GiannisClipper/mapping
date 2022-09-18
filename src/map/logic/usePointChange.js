import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function usePointChange() {

    const { map } = useContext( MapContext );

    const onChangePosition = geoPoint => {
        console.log( 'onChangePosition', geoPoint );
        if ( geoPoint ) {
            const { index } = geoPoint;
            map.points[ index ].position = geoPoint.getPosition();
            // direct assignment, no redundunt rerender
        }
    };
    
    return { onChangePosition };
}

export { usePointChange };