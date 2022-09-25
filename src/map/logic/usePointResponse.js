import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { Point as GeoPoint } from "../../geometry/point";

function usePointResponse( { setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { request, values, setValues, resetValues } ) => {

        const color = "fuchsia";
        const size = 5;
        const geoPoint = GeoPoint.instances.add( new GeoPoint( { title: values.changeable.title, color, size } ) );
        const position = geoPoint.getPosition();
        const point = { ...values.changeable, position, color, size };
        const points = [ ...map.points, point ];

        setMap( { ...map, points } );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { request, values, setValues, resetValues } ) => {

        const { points } = map;
        for ( let i = 0; i < points.length; i++ ) {
            if ( points[ i ].title === values.initial.title ) {
                points[ i ] = { ...values.changeable };
                const geoPoint = GeoPoint.instances.getByIndex( i );
                geoPoint.setTitle( values.changeable.title );
                break;
            }
        }
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { request, values, setValues, resetValues } ) => {

        const { points } = map;
        for ( let i = 0; i < points.length; i++ ) {
            if ( points[ i ].title === values.initial.title ) {
                GeoPoint.instances.removeByIndex( i );
                points.splice( i, 1 );
            }
        }
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { usePointResponse };