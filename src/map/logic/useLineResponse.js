import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { Line as GeoLine } from "../../geometry/line";

function useLineResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { values, request } ) => {

        const geoLine = GeoLine.instances.add( new GeoLine( { title: values.changeable.title } ) );
        const positions = geoLine.getPositions();
        const line = { ...values.changeable, positions };
        const lines = [ ...map.lines, line ];

        setMap( { ...map, lines } );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        const { lines } = map;
        for ( let i = 0; i < lines.length; i++ ) {
            if ( lines[ i ].title === values.initial.title ) {
                lines[ i ] = { ...values.changeable };
                const geoLine = GeoLine.instances.getByIndex( i );
                geoLine.popup.setContent( values.changeable.title );
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
                const geoLine = GeoLine.instances.getByIndex( i );
                geoLine.removeFocus();
                GeoLine.instances.removeByIndex( i );
                lines.splice( i, 1 );
            }
        }
        setMap( { ...map, lines } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useLineResponse };