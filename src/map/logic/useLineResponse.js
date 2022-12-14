import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { Line as GeoLine } from "../../geometry/line";

function useLineResponse( { setStatus } ) {

    const { map, setMap } = useContext( MapContext );

    const onPostResponse = ( { request, values, setValues, resetValues } ) => {

        const color = "fuchsia";
        const size = 3;
        const geoLine = GeoLine.instances.add( new GeoLine( { color, size } ) );
        geoLine.setPopupContent( values.changeable );
        const positions = geoLine.getPositions();
        const line = { ...values.changeable, positions, color, size };
        const lines = [ ...map.lines, line ];

        setMap( { ...map, lines } );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { request, values, setValues, resetValues } ) => {

        const { lines: oldLines } = map;
        const lines = [ ...oldLines ];
     
        for ( let i = 0; i < lines.length; i++ ) {
            if ( lines[ i ].title === values.initial.title ) {
                lines[ i ] = { ...values.changeable };
                const geoLine = GeoLine.instances.getByIndex( i );
                geoLine.setPopupContent( values.changeable );
                break;
            }
        }
        setMap( { ...map, lines } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { request, values, setValues, resetValues } ) => {

        const { lines: oldLines } = map;
        const lines = [ ...oldLines ];

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