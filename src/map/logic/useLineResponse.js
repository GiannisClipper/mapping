import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { Line as GeoLine } from "../../geometry/line";

function useLineResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { values, request } ) => {

        const color = "fuchsia";
        const size = 3;
        const geoLine = GeoLine.instances.add( new GeoLine( { title: values.changeable.title, color, size } ) );
        const positions = geoLine.getPositions();
        const line = { ...values.changeable, positions, color, size };
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
                geoLine.setTitle( values.changeable.title );
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