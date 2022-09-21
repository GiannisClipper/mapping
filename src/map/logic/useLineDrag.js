import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { moveByIndex } from "../../_commons/logic/helpers";
import { Line as GeoLine } from "../../geometry/line";

function useLineDrag() {

    const { map, setMap } = useContext( MapContext );

    const onMove = ( from, to ) => {
        moveByIndex( map.lines, from, to );
        setMap( { ...map } );
        const geoLines = GeoLine.instances.getAll();
        moveByIndex( geoLines, from, to );
        GeoLine.instances.setAll( geoLines );
    }

    return { onMove };
}

export { useLineDrag };

