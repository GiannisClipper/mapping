import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function useMapResponse( { resetValues, setStatus } ) {

    const { maps, setMaps } = useContext( MyMapsContext );

    const onPostResponse = ( { values, request } ) => {

        setMaps( [ ...maps, values.changeable ] );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].id === values.initial.id ) {
                maps[ i ] = { ...values.changeable };
                break;
            }
        }
        setMaps( [ ...maps ] );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const newMaps = maps.filter( map => map.id !== values.initial.id );
        setMaps( newMaps );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useMapResponse };