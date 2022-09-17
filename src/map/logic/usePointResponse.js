import { useContext } from "react"; 
import { MapContext } from "../MapContext";
import { GeoRefContext } from "../../geometry/GeoRefContext";
import { Point } from "../../leaflet/point";

function usePointResponse( { resetValues, setStatus } ) {

    const { map, setMap } = useContext( MapContext );
    const { geoRef } = useContext( GeoRefContext );

    const onPostResponse = ( { values, request } ) => {

//        const { lat, lng } = geoRef.current.map.ref.getCenter();
//        const position = [ lat, lng ];
        const p = Point.add( { title: values.changeable.title } );
        const position = p.getPosition();
        const point = { ...values.changeable, position };
        const points = [ ...map.points, point ];

        setMap( { ...map, points } );
        console.log( "Point", Point );
//        geoRef.current.points.push( null );
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

        const { points } = map;
        for ( let i = 0; i < points.length; i++ ) {
            if ( points[ i ].title === values.initial.title ) {
                points.splice( i, 1 );
                geoRef.current.points.splice( i, 1 );
            }
        }
        setMap( { ...map, points } );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { usePointResponse };