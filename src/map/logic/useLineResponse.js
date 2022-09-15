import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { GeoRefContext } from "../../geometry/GeoRefContext";

function useLineResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );

    const onPostResponse = ( { values, request } ) => {

        const latLng = geoRef.current.map.ref.getCenter();
        const line = { ...values.changeable, ...latLng };
        const lines = [ ...map.lines, line ];

        setMap( { ...map, lines } );
        geoRef.current.lines.push( null );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        const { lines } = map;
        for ( let i = 0; i < lines.length; i++ ) {
            if ( lines[ i ].title === values.initial.title ) {
                lines[ i ] = { ...values.changeable };
                break;
            }
        }
        setMap( { ...map, lines } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const { lines } = map;
        for ( let i = 0; i < lines.length; i++ ) {
            if ( lines[ i ].title === values.initial.title ) {
                lines.splice( i, 1); // 1 = remove one item only
                geoRef.current.lines.splice( i, 1);
            }
        }
        setMap( { ...map, lines } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useLineResponse };