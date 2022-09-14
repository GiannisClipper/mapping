import { useContext } from "react"; 
import { MapContext } from "../MapContext";

function usePointResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { values, request } ) => {
        const latLng = map.ref.getCenter();
        const point = { ...values.changeable, ...latLng };
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
                break;
            }
        }
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const points = map.points.filter( point => point.title !== values.initial.title );
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { usePointResponse };