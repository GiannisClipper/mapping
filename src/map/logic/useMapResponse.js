import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { MapContext } from "../MapContext";

function useMapResponse( { resetValues, setStatus } ) {

    const { maps, setMaps } = useContext( MyMapsContext );

    const mapContext = useContext( MapContext );

    const onPostResponse = ( { values, request } ) => {

        setMaps( [ ...maps, values.changeable ] );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].id === values.initial.id ) {
                maps[ i ] = { ...request.current.success };
                break;
            }
        }
        setMaps( [ ...maps ] );
        setStatus( { afterResponse: true } );
    }

    const onGetResponse = ( { values, request } ) => {

        const { setMap } = mapContext;
        setMap( request.current.success );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const newMaps = maps.filter( map => map.id !== values.initial.id );
        setMaps( newMaps );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onGetResponse, onDeleteResponse };
}

export { useMapResponse };