import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { Point as GeoPoint } from "../../geometry/point";

function usePointResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { values, request } ) => {

        const geoPoint = GeoPoint.instances.add( new GeoPoint( { title: values.changeable.title } ) );
        const position = geoPoint.getPosition();
        const point = { ...values.changeable, position };
        const points = [ ...map.points, point ];

        setMap( { ...map, points } );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        const { points } = map;
        for ( let i = 0; i < points.length; i++ ) {
            if ( points[ i ].title === values.initial.title ) {
                points[ i ] = { ...values.changeable };
                const geoPoint = GeoPoint.instances.getByIndex( i );
                geoPoint.popup.setContent( values.changeable.title );
                break;
            }
        }
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const { points } = map;
        for ( let i = 0; i < points.length; i++ ) {
            if ( points[ i ].title === values.initial.title ) {
                const geoPoint = GeoPoint.instances.getByIndex( i );
                geoPoint.removeFocus();
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