import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { moveByIndex } from "../../_commons/logic/helpers";
import { Point as GeoPoint } from "../../geometry/point";

function usePointDrag() {

    const { map, setMap } = useContext( MapContext );

    const onMove = ( from, to ) => {
        moveByIndex( map.points, from, to );
        setMap( { ...map } );
        const geoPoints = GeoPoint.instances.getAll();
        moveByIndex( geoPoints, from, to );
        GeoPoint.instances.setAll( geoPoints );
    }

    return { onMove };
}

export { usePointDrag };

