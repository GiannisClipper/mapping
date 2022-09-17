import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { GeoRefContext } from "../../geometry/GeoRefContext";
import { Line as LeafLine } from "../../leaflet/line";

function useLineResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );

    const onPostResponse = ( { values, request } ) => {

        const mapRef = geoRef.current.map.ref;
        // in theory ranges are -90..90 for latitude and -180..180 for longitude
        // example results:
        // getCenter(): {lat: 37.11264015821309, lng: 24.080549036932922} 
        // getBounds().getNorthEast(): {lat: 79.48574423856486, lng: 148.18211153693295} 
        // getBounds().getSouthEast(): {lat: -49.192069068643214, lng: 148.18211153693295}

        // const center = mapRef.getCenter()
        // const northEast = mapRef.getBounds().getNorthEast()
        // const southWest = mapRef.getBounds().getSouthEast()
        // const size = ( northEast.lat - southWest.lat ) * 0.25;
        // const positions = [ 
        //     [ center.lat - size, center.lng - size ], 
        //     [ center.lat + size, center.lng + size ] 
        // ] ;
        const l = LeafLine.add( { title: values.changeable.title } );
        const positions = l.getPositions();

        const line = { ...values.changeable, positions };
        const lines = [ ...map.lines, line ];

        setMap( { ...map, lines } );
//        geoRef.current.lines.push( null );
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
                lines.splice( i, 1 );
                geoRef.current.lines.splice( i, 1 );
            }
        }
        setMap( { ...map, lines } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useLineResponse };