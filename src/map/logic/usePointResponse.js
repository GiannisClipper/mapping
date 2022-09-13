import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { OSMapContext } from "../../OSMap/OSMapContext";

function usePointResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );
    const mapRef = useContext( OSMapContext );

    const onPostResponse = ( { values, request } ) => {
        const latLng = mapRef.current.map.getCenter();
        const point = { ...values.changeable, ...latLng };
        const points = [ ...map.points, point ];
        setMap( { ...map, points } );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        // for ( let i = 0; i < users.length; i++ ) {
        //     if ( users[ i ].id === values.initial.id ) {
        //         users[ i ] = { ...values.changeable };
        //         break;
        //     }
        // }
        // setUsers( [ ...users ] );
        // setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        // const newUsers = users.filter( user => user.id !== values.initial.id );
        // setUsers( newUsers );
        // setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { usePointResponse };